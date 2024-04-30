import {
  IsUUID,
  IsNotEmpty,
  IsString,
  ValidateNested,
  IsArray,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export class HouseDto {
  @IsNotEmpty()
  @IsString()
  number: string;

  @IsOptional()
  @IsUUID()
  owner?: string;

  @IsNotEmpty()
  @IsUUID()
  complex: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ValidateNested({ each: true })
  residents: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  vehicles?: string[];
}
