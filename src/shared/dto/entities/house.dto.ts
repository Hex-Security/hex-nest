import { PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import mongoose from 'mongoose';

export class CreateHouseDto {
  @IsNotEmpty()
  @IsString()
  number: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsOptional()
  @Type(() => mongoose.Schema.Types.ObjectId)
  owner_id?: mongoose.Schema.Types.ObjectId;

  @IsOptional()
  @Type(() => mongoose.Schema.Types.ObjectId)
  resident_ids?: mongoose.Schema.Types.ObjectId[];

  @IsOptional()
  @Type(() => mongoose.Schema.Types.ObjectId)
  vehicle_ids?: mongoose.Schema.Types.ObjectId[];

  @IsNotEmpty()
  @IsNumber()
  bedrooms: number;

  @IsNotEmpty()
  @IsNumber()
  bathrooms: number;

  @IsNotEmpty()
  @IsNumber()
  square_m: number;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}

export class UpdateHouseDto {
  @IsOptional()
  @Type(() => mongoose.Schema.Types.ObjectId)
  owner_id?: mongoose.Schema.Types.ObjectId;

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
