import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { RolesEnum } from 'src/shared/enum/roles.enum';

export class CreateRegistrationCodeDto {
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

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Complex ID',
    example: 'complex_id',
  })
  complex?: string;
}
