import { Controller, Get } from '@nestjs/common';
import { InitialDataService } from '../services/initial-data.service';

@Controller('api/initial-data')
export class InitialDataController {
  constructor(private readonly initialDataService: InitialDataService) {}

  @Get()
  async getInitialData() {
    return this.initialDataService.getInitialData();
  }
}
