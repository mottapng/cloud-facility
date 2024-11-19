import { Module } from '@nestjs/common';
import { DataHandlerService } from './data-handler.service';
import { MqttModule } from '../mqtt/mqtt.module';
import { DatabaseModule } from '../database/database.module';
import { WebsocketModule } from '../websocket/websocket.module';

@Module({
  imports: [MqttModule, DatabaseModule, WebsocketModule],
  providers: [DataHandlerService],
  exports: [DataHandlerService],
})
export class DataHandlerModule {}
