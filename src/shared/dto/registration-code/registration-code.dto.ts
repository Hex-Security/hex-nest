import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { RolesEnum } from 'src/shared/enum/roles.enum';

export class RegistrationCodeDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Code',
    example: '12345678',
  })
  code: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    type: String,
    description: 'Email',
    example: 'user@email.com',
  })
  email: string;

  @IsNotEmpty()
  @IsEnum(RolesEnum)
  @ApiProperty({
    type: String,
    description: 'Role',
    example: RolesEnum.GUARD,
  })
  role: RolesEnum;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Emitter ID',
    example: 'admin_or_dev_account_id',
  })
  admin: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    type: String,
    description: 'Complex ID',
    example: 'complex_id',
  })
  complex?: string;
}
