import { Injectable } from '@nestjs/common';
import { DataHandlerService } from '../../data-handler/data-handler.service';
@Injectable()
export class InitialDataService {
  constructor(private readonly dataHandlerService: DataHandlerService) {}

  async getInitialData() {
    return this.dataHandlerService.getMostRecentData();
  }
}
