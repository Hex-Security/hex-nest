import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsMobilePhone,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import mongoose from 'mongoose';
import { VisitorStatus } from '../enum/visitor.enum';
import { PartialType } from '@nestjs/swagger';

export class CreateVisitorDto {
  @IsNotEmpty()
  @Type(() => mongoose.Schema.Types.ObjectId)
  complex_id: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty()
  @Type(() => mongoose.Schema.Types.ObjectId)
  host_id: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsMobilePhone()
  phone: string;

  @IsNotEmpty()
  @IsString()
  id_number: string;

  @IsNotEmpty()
  @Type(() => mongoose.Schema.Types.ObjectId)
  vehicle_id: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty()
  @Type(() => mongoose.Schema.Types.ObjectId)
  requested_by: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty()
  @Type(() => mongoose.Schema.Types.ObjectId)
  approved_by: mongoose.Schema.Types.ObjectId;

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
  @IsEnum({ type: 'enum', enum: VisitorStatus })
  status: VisitorStatus;
}

export class UpdateVisitorDto extends PartialType(CreateVisitorDto) {}
