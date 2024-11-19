import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GetDataDto } from '../../shared/dto/get-data.dto';
import { Data, DataKey } from '../../shared/schemas/data.schema';
import { BaseRepository } from './base.repository';

@Injectable()
export class DataRepository extends BaseRepository<Data> {
  constructor(@InjectModel(Data.name) dataModel: Model<Data>) {
    super(dataModel);
  }

  async getData(
    getDataDto: GetDataDto,
  ): Promise<{ data: Data[]; total: number }> {
    const {
      startDate,
      endDate,
      page = 1,
      limit = 10,
      sortBy = 'timestamp',
      sortOrder = 'desc',
      status,
    } = getDataDto;
    const query: Partial<Record<DataKey, any>> = {};
    if (startDate) {
      query.timestamp = { $gte: new Date(startDate) };
    }
    if (endDate) {
      query.timestamp = { ...query.timestamp, $lte: new Date(endDate) };
    }
    if (status) {
      query.status = status;
    }

    const total = await this.model.countDocuments(query);

    const validSortFields: DataKey[] = ['timestamp', 'value'];
    const finalSortBy: DataKey = validSortFields.includes(sortBy)
      ? sortBy
      : 'timestamp';

    const finalSortOrder = sortOrder === 'asc' ? 1 : -1;

    const data = await this.model
      .find(query)
      .sort({ [finalSortBy]: finalSortOrder })
      .skip((page - 1) * limit)
      .limit(limit)
      .select('-__v')
      .lean()
      .exec();

    return { data, total };
  }
}
