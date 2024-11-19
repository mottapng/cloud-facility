import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { connect, MqttClient } from 'mqtt';
import { Subject } from 'rxjs';
import { RawData } from '../shared/interfaces/data.interface';

@Injectable()
export class MqttService implements OnModuleDestroy {
  private client: MqttClient;
  private dataSubject = new Subject<RawData>();

  constructor(private configService: ConfigService) {
    const brokerUrl = this.configService.get<string>('MQTT_BROKER_URL');
    const username = this.configService.get<string>('MQTT_USERNAME');
    const password = this.configService.get<string>('MQTT_PASSWORD');

    this.client = connect(brokerUrl, {
      username,
      password,
      reconnectPeriod: 5000,
      keepalive: 60,
    });

    this.setupClientHandlers();
  }

  private setupClientHandlers() {
    this.client.on('connect', () => {
      const topic = this.configService.get<string>('MQTT_TOPIC');
      console.log('Connected to MQTT broker');
      this.client.subscribe(topic);
    });

    this.client.on('error', (error) => {
      console.error('MQTT Error:', error);
    });

    this.client.on('message', (topic, message) => {
      try {
        const data: RawData = JSON.parse(message.toString());
        console.log('Received data:', data);
        this.dataSubject.next(data);
      } catch (error) {
        console.error('Error parsing MQTT message:', error);
      }
    });
  }

  getData() {
    return this.dataSubject.asObservable();
  }

  onModuleDestroy() {
    this.client?.end();
  }
}
