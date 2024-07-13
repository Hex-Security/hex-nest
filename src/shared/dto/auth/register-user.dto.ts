import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { RegisterCodeDto } from './register-code.dto';

export class RegisterUserDto extends RegisterCodeDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: "User's email",
    example: 'resident@email.com',
  })
  email: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: "User's username",
    example: 'JohnDoe Resident',
  })
  username?: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description:
      "User's registration code. Needed to register as an user (must be provided by the admin)",
    example: 'registration_code',
  })
  code: string;
}
