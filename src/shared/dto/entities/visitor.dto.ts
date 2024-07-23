import {
  IsDate,
  IsEmail,
  IsEnum,
  IsMobilePhone,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { VisitorStatus } from '../../enum/visitor.enum';
import { PartialType } from '@nestjs/swagger';

export class VisitorDto {
  @IsNotEmpty()
  @IsString()
  _id: string;

  @IsNotEmpty()
  @IsString()
  complex: string;

  @IsNotEmpty()
  @IsString()
  host: string;

  @IsNotEmpty()
  @IsString()
  house: string;

  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsMobilePhone()
  phone?: string;

  @IsOptional()
  @IsString()
  id_number?: string;

  @IsOptional()
  @IsString()
  vehicle?: string;

  @IsNotEmpty()
  @IsString()
  requested_by: string;

  @IsOptional()
  @IsString()
  approved_by?: string;

  @IsNotEmpty()
  @IsEnum({ type: 'enum', enum: VisitorStatus })
  status: VisitorStatus;
}




