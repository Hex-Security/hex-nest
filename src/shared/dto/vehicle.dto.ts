import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class VehicleDto {
  @IsString()
  make: string;

  @IsOptional()
  @IsString()
  model?: string;

  @IsString()
  plate: string;

  @IsOptional()
  @IsString()
  year?: string;

  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  metadata?: any;

  @IsOptional()
  @IsBoolean()
  is_visitor?: boolean;

  @IsString()
  house: string;

  @IsOptional()
  @IsString()
  visitor?: string;

  @IsOptional()
  @IsString()
  user?: string;
}
