import { Controller, Get, Query } from '@nestjs/common';
import { GetDataDto } from '../../shared/dto/get-data.dto';
import { DataService } from '../services/data.service';

@Controller('api/data')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @Get()
  async getData(@Query() getDataDto: GetDataDto) {
    const result = await this.dataService.getData(getDataDto);
    return {
      data: result.data,
      meta: {
        total: result.total,
        page: result.page,
        limit: result.limit,
        totalPages: Math.ceil(result.total / result.limit),
      },
    };
  }
}
