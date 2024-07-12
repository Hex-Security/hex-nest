import { PartialType } from '@nestjs/swagger';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { RolesEnum } from 'src/shared/enum/roles.enum';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  _id: string;

  @IsNotEmpty()
  @IsString()
  uid: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  username?: string;

  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsOptional()
  @IsDate()
  birth_date?: Date;

  @IsNotEmpty()
  @IsEnum(RolesEnum)
  role: RolesEnum;

  @IsOptional()
  @IsString()
  phone?: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
