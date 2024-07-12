import {
  IsNotEmpty,
  IsString,
  ValidateNested,
  ArrayNotEmpty,
  IsArray,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PartialType } from '@nestjs/swagger';

class AccessPointDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  location: string;
}

export class CreateComplexDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  state: string;

  @IsNotEmpty()
  @IsString()
  zip_code: string;

  @ValidateNested({ each: true })
  @Type(() => AccessPointDto)
  @ArrayNotEmpty()
  @IsArray()
  access_points: AccessPointDto[];

  @IsNotEmpty()
  @IsString()
  contact_number: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsOptional()
  @IsArray()
  admin_ids: string[];

  @IsOptional()
  @IsArray()
  guard_ids: string[];

  @IsOptional()
  @IsArray()
  house_ids: string[];

  @IsNotEmpty()
  @IsBoolean()
  active: boolean;
}

export class UpdateComplexDto extends PartialType(CreateComplexDto) {}
