import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Status } from '../interfaces/data.interface';

@Schema()
export class Data extends Document {
  @Prop({ required: true })
  value: number;

  @Prop({ required: true })
  timestamp: Date;

  @Prop({ required: true })
  status: Status;
}

export const DataSchema = SchemaFactory.createForClass(Data);

export type DataKey = keyof Omit<Data, keyof Document>;
