import { IsOptional, IsString } from 'class-validator';

export class ComplexDto {
  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsString()
  @IsOptional()
  zip?: string;

  @IsOptional()
  admin_id?: string;

  @IsOptional()
  metadata?: any;
}
