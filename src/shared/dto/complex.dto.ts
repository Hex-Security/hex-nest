import { HouseDto } from './house.dto';
import { UserDto } from './user.dto';
import { IsString, IsOptional } from 'class-validator';

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
  zip: string;

  @IsOptional()
  admin?: UserDto | string;

  @IsOptional()
  houses?: HouseDto[] | string[];

  @IsOptional()
  metadata?: any;
}
