import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Data, DataSchema } from '../shared/schemas/data.schema';
import { DataRepository } from './repositories/data.repository';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:admin@data-storage.uglaa.mongodb.net/?retryWrites=true&w=majority&appName=data-storage',
    ),
    MongooseModule.forFeature([{ name: Data.name, schema: DataSchema }]),
  ],
  providers: [DataRepository],
  exports: [DataRepository],
})
export class DatabaseModule {}
