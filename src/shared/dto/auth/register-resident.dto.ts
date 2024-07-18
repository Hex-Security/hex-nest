import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { RegisterCodeDto } from './register-code.dto';

export class RegisterResidentDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: "Residents's email",
    example: 'resident@email.com',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: "Residents's password",
    example: 'password123!--',
  })
  password: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: "User's username",
    example: 'JohnDoe Resident',
  })
  username?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: "Residents's first name",
    example: 'John',
  })
  first_name?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: "Residents's last name",
    example: 'Doe',
  })
  last_name?: string;
}
