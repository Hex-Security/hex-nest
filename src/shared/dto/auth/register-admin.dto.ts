import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { RegisterDto } from './register-base.dto';

export class RegisterAdminDto extends RegisterDto {
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
