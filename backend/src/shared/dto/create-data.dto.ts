import { IsNumber, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateDataDto {
  @IsNumber()
  value: number;

  @IsDateString()
  @Type(() => Date)
  timestamp: Date;
}
