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

export class RegisterGuardDto extends RegisterDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description:
      "Guard's registration code. Needed to register as a guard (must be provided by the admin)",
    example: 'registration_code',
  })
  code: string;
}
