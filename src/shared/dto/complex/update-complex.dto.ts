import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ComplexDto } from '../entities/complex.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateComplexDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    type: String,
    description: 'The name of the complex',
    example: 'Complex New name',
  })
  contact_number?: string;

  @IsOptional()
  @IsEmail()
  @ApiPropertyOptional({
    type: String,
    description: 'The email of the complex',
    example: 'new.complex@email.com',
  })
  email?: string;
}

export class UpdatedComplexDto extends ComplexDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    type: String,
    description: 'The name of the complex',
    example: 'Complex New name',
  })
  contact_number?: string;

  @IsOptional()
  @IsEmail()
  @ApiPropertyOptional({
    type: String,
    description: 'The email of the complex',
    example: 'new.complex@email.com',
  })
  email?: string;
}
