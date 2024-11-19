import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MqttModule } from './mqtt/mqtt.module';
import { WebsocketModule } from './websocket/websocket.module';
import { DatabaseModule } from './database/database.module';
import { DataHandlerModule } from './data-handler/data-handler.module';
import { ApiModule } from './api/api.module';
import { validateConfig } from './config/validation.schema';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validate: validateConfig,
    }),
    ApiModule,
    MqttModule,
    WebsocketModule,
    DatabaseModule,
    DataHandlerModule,
  ],
})
export class AppModule {}
