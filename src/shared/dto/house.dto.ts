import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class HouseDto {
  @IsNotEmpty()
  @IsString()
  number: string;

  @IsOptional()
  @IsString()
  owner?: string;

  @IsNotEmpty()
  @IsString()
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
