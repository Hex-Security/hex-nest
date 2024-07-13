import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import mongoose from 'mongoose';
import { AccessPointDto } from '../complex/acces-point.dto';

export class ComplexDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'The name of the complex',
    required: true,
    example: 'Complex Name',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'The address of the complex',
    required: true,
    example: 'Complex Address',
  })
  address: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'The city of the complex',
    required: true,
    example: 'Complex City',
  })
  city: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'The state of the complex',
    required: true,
    example: 'Complex State',
  })
  state: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'The zip code of the complex',
    required: true,
    example: 'Complex Zip Code',
  })
  zip_code: string;

  @IsOptional()
  @IsMobilePhone()
  @ApiPropertyOptional({
    type: String,
    description: 'The contact number of the complex',
    example: '1234567890',
  })
  contact_number?: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty({
    type: String,
    description: 'The email of the complex',
    example: 'complex@email.com',
  })
  email?: string;

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional({
    type: Boolean,
    description: 'The active status of the complex',
    default: true,
  })
  active?: boolean;

  @IsArray()
  @Type(() => mongoose.Schema.Types.ObjectId)
  @ApiProperty({
    type: [mongoose.Schema.Types.ObjectId],
    description: 'The admins of the complex',
    required: true,
  })
  admins: mongoose.Schema.Types.ObjectId[];

  @IsArray()
  @Type(() => mongoose.Schema.Types.ObjectId)
  @ApiProperty({
    type: [mongoose.Schema.Types.ObjectId],
    description: 'The guards of the complex',
    required: true,
  })
  guards: mongoose.Schema.Types.ObjectId[];

  @IsArray()
  @Type(() => mongoose.Schema.Types.ObjectId)
  @ApiProperty({
    type: [mongoose.Schema.Types.ObjectId],
    description: 'The houses of the complex',
    required: true,
  })
  houses: mongoose.Schema.Types.ObjectId[];

  @IsArray()
  @Type(() => AccessPointDto)
  @ApiProperty({
    type: [AccessPointDto],
    description: 'The access points of the complex',
  })
  access_points: AccessPointDto[];
}
