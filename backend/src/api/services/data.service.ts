import { Injectable } from '@nestjs/common';
import { DataRepository } from '../../database/repositories/data.repository';
import { GetDataDto } from '../../shared/dto/get-data.dto';
import { Data } from '../../shared/schemas/data.schema';

@Injectable()
export class DataService {
  constructor(private readonly dataRepository: DataRepository) {}

  async getData(
    getDataDto: GetDataDto,
  ): Promise<{ data: Data[]; total: number; page: number; limit: number }> {
    const { data, total } = await this.dataRepository.getData(getDataDto);
    return {
      data,
      total,
      page: getDataDto.page || 1,
      limit: getDataDto.limit || 10,
    };
  }
}
