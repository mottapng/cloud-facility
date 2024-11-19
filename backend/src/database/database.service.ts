import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Data } from '../shared/schemas/data.schema';
import { ProcessedData } from '../shared/interfaces/data.interface';

@Injectable()
export class DatabaseService {
  constructor(@InjectModel(Data.name) private dataModel: Model<Data>) {}

  async saveData(data: ProcessedData): Promise<void> {
    const newData = new this.dataModel(data);
    console.log('Salvando no banco: ', newData);
    await newData.save();
  }
}
