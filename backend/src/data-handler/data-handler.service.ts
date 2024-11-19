import { Injectable } from '@nestjs/common';
import { DataRepository } from 'src/database/repositories/data.repository';
import { getStatusByValue } from 'src/shared/utils/functions';
import { MqttService } from '../mqtt/mqtt.service';
import { ProcessedData, RawData } from '../shared/interfaces/data.interface';
import { WebsocketGateway } from '../websocket/websocket.gateway';

@Injectable()
export class DataHandlerService {
  private dataBuffer: ProcessedData[] = [];
  private lastSaveTimestamp: number = Date.now();
  private mostRecentData: ProcessedData | null = null;
  constructor(
    private mqttService: MqttService,
    private dataRepository: DataRepository,
    private websocketGateway: WebsocketGateway,
  ) {
    this.setupDataFlow();
    this.startPeriodicSave();
  }

  private setupDataFlow() {
    this.mqttService.getData().subscribe((rawData: RawData) => {
      const processedData = this.processData(rawData);
      this.mostRecentData = processedData;
      this.bufferData(processedData);
      this.websocketGateway.broadcastData(processedData);
    });
  }

  getMostRecentData(): ProcessedData | null {
    return this.mostRecentData;
  }

  private processData(data: RawData): ProcessedData {
    return {
      value: Number(data.ValorPublicando.toFixed(2)),
      status: getStatusByValue(data.ValorPublicando),
      timestamp: new Date(data.ts),
    };
  }

  private bufferData(data: ProcessedData) {
    this.dataBuffer.push(data);
  }

  private startPeriodicSave(): void {
    setInterval(() => this.saveBufferedData(), 60000); // Run every minute
  }

  private async saveBufferedData(): Promise<void> {
    if (this.dataBuffer.length === 0) return;

    const currentTimestamp = Date.now();
    const relevantData = this.dataBuffer.filter(
      (data) => data.timestamp.getTime() >= this.lastSaveTimestamp,
    );

    if (relevantData.length === 0) return;

    // const averageValue = Number(
    //   (
    //     relevantData.reduce((sum, data) => sum + data.value, 0) /
    //     relevantData.length
    //   ).toFixed(2),
    // );

    // Uncomment this to start saving data to the database every minute
    // await this.dataRepository.create({
    //   value: averageValue,
    //   timestamp: new Date(currentTimestamp),
    // });

    this.lastSaveTimestamp = currentTimestamp;
    this.dataBuffer = [];
  }
}
