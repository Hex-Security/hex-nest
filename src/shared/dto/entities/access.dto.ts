import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import mongoose from 'mongoose';
import { AccessStatus } from '../../enum/access.enum';
import { PartialType } from '@nestjs/swagger';

export class CreateAccessDto {
  @IsNotEmpty()
  @Type(() => mongoose.Schema.Types.ObjectId)
  visitor_id: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty()
  @Type(() => mongoose.Schema.Types.ObjectId)
  house_id: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty()
  @Type(() => mongoose.Schema.Types.ObjectId)
  complex_id: mongoose.Schema.Types.ObjectId;

  @IsOptional()
  @Type(() => mongoose.Schema.Types.ObjectId)
  vehicle_id?: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty()
  @Type(() => mongoose.Schema.Types.ObjectId)
  requested_by: mongoose.Schema.Types.ObjectId;

  @IsOptional()
  @Type(() => mongoose.Schema.Types.ObjectId)
  approved_by?: mongoose.Schema.Types.ObjectId;

  @IsOptional()
  @Type(() => mongoose.Schema.Types.ObjectId)
  assigned_guard_id?: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty()
  @IsDate()
  expected_arrival: Date;

  @IsOptional()
  @IsDate()
  expected_departure?: Date;

  @IsOptional()
  @IsDate()
  actual_arrival?: Date;

  @IsOptional()
  @IsDate()
  actual_departure?: Date;

  @IsNotEmpty()
  @IsEnum(AccessStatus)
  status: AccessStatus;

  @IsNotEmpty()
  @IsString()
  purpose: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class UpdateAccessDto extends PartialType(CreateAccessDto) {}
