import { Transform, Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { Status } from '../interfaces/data.interface';
import { DataKey } from '../schemas/data.schema';

export class GetDataDto {
  @IsOptional()
  @Type(() => String)
  startDate?: string;

  @IsOptional()
  @Type(() => String)
  endDate?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page?: number = 1;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  @Type(() => Number)
  limit?: number = 20;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value as Status)
  status?: Status;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value as DataKey)
  sortBy?: DataKey = 'timestamp';

  @IsOptional()
  @Transform(({ value }) => value.toLowerCase() as 'asc' | 'desc')
  sortOrder?: 'asc' | 'desc' = 'desc';
}
