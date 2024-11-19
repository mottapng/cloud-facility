import { Module } from '@nestjs/common';
import { DataController } from './controllers/data.controller';
import { DataService } from './services/data.service';
import { DatabaseModule } from '../database/database.module';
import { InitialDataService } from './services/initial-data.service';
import { InitialDataController } from './controllers/initial-data.controller';
import { DataHandlerModule } from '../data-handler/data-handler.module';

@Module({
  imports: [DatabaseModule, DataHandlerModule],
  controllers: [DataController, InitialDataController],
  providers: [DataService, InitialDataService],
})
export class ApiModule {}
