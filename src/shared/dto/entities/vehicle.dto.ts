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

export class CreateVehicleDto {
  @IsNotEmpty()
  @Type(() => mongoose.Schema.Types.ObjectId)
  owner_id: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  plate: string;

  @IsNotEmpty()
  @IsString()
  make: string;

  @IsNotEmpty()
  @IsString()
  v_model: string;

  @IsNotEmpty()
  @IsNumber()
  year: number;

  @IsNotEmpty()
  @IsString()
  color: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}

export class UpdateVehicleDto extends PartialType(CreateVehicleDto) {}
