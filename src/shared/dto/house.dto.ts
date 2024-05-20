import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class HouseDto {
  @IsNotEmpty()
  @IsString()
  number: string;

  @IsOptional()
  @IsString()
  owner_id?: string;

  @IsNotEmpty()
  @IsString()
  complex_id: string;
}
