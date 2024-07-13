import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { RegisterCodeDto } from './register-code.dto';

export class RegisterAdminDto extends RegisterCodeDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    type: String,
    description: "Admin's email",
    example: 'admin@email.com',
  })
  email: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: "Admin's username",
    example: 'JohnDoe Admin',
  })
  username?: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description:
      "Admin's registration code. Needed to register as a Admin (must be provided by the sales team)",
    example: 'registration_code',
  })
  code: string;
}
