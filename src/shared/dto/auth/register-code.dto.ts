import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { RegisterBaseDto } from './register-base.dto';

export class RegisterCodeDto extends RegisterBaseDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description:
      "User's registration code. Needed to register as a User (must be provided by the admin)",
    example: 'registration_code',
  })
  code: string;
}
