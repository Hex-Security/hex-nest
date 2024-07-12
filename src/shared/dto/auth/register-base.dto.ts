import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: "User's email",
    example: 'resident@email.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: "User's password",
    example: 'password123!--',
  })
  password: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: "User's username",
    example: 'JohnDoe@email.com',
  })
  username?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: "User's first name",
    example: 'John',
  })
  first_name?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: "User's last name",
    example: 'Doe',
  })
  last_name?: string;

  @IsOptional()
  @IsDate()
  @ApiProperty({
    type: Date,
    description: "User's date of birth",
    example: new Date().toISOString(),
  })
  dob?: Date;
}
