import { Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional } from 'class-validator';
import mongoose from 'mongoose';

export class UpdateHouseDto {
  @IsOptional()
  @IsNumber()
  bedrooms?: number;

  @IsOptional()
  @IsNumber()
  bathrooms?: number;

  @IsOptional()
  @IsNumber()
  square_m?: number;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
