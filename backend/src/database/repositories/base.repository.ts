import { Model, Document } from 'mongoose';

export abstract class BaseRepository<T extends Document> {
  constructor(protected readonly model: Model<T>) {}

  async findAll(filter = {}): Promise<T[]> {
    return this.model.find(filter).exec();
  }

  async findOne(filter = {}): Promise<T | null> {
    return this.model.findOne(filter).exec();
  }

  async create(data: Partial<T>): Promise<T> {
    const entity = new this.model(data);
    return entity.save();
  }
}
