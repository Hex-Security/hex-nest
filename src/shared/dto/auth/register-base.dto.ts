import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class RegisterBaseDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: "Dev's email",
    example: 'dev@email.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: "Dev's password",
    example: 'password123!--',
  })
  password: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: "Dev's username",
    example: 'JohnDoe Dev',
  })
  username?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: "Dev's first name",
    example: 'John',
  })
  first_name?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: "Dev's last name",
    example: 'Doe',
  })
  last_name?: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty({
    type: String,
    description: "Dev's date of birth",
    example: new Date(
      Date.now() - 18 * 365 * 24 * 60 * 60 * 1000,
    ).toISOString(),
  })
  dob?: string;
}
