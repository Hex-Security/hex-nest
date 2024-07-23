import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsMobilePhone,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { VisitorStatus } from 'src/shared/enum/visitor.enum';
export class CreateVisitorDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Complex ID',
    example: '60f1b0b3b3f3b3b3b3f3b3b3',
  })
  complex: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'House ID',
    example: '60f1b0b3b3f3b3b3b3f3b3b3',
  })
  house: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'First name',
    example: 'John',
  })
  first_name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Last name',
    example: 'Doe',
  })
  last_name: string;

  @IsOptional()
  @IsEmail()
  @ApiPropertyOptional({
    description: 'Email',
    example: 'visitor@email.com',
  })
  email?: string;

  @IsOptional()
  @IsMobilePhone()
  @ApiPropertyOptional({
    description: 'Phone number',
    example: '1234567890',
  })
  phone?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'ID number',
    example: '1234567890',
  })
  id_number?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'Vehicle ID',
    example: '60f1b0b3b3f3b3b3b3f3b3b3',
  })
  vehicle?: string;
}
