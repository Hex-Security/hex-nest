import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateHouseDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Complex id',
    example: '60d5ec9a6a2c1f001f8b4b6b',
  })
  complex: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'House number',
    example: '123',
  })
  number: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'House address',
    example: '123 Main St',
  })
  address: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'Complex id',
    example: '60d5ec9a6a2c1f001f8b4b6b',
  })
  owner?: string;

  @IsOptional()
  @IsString({ each: true })
  @ApiPropertyOptional({
    description: 'Complex id',
    example: ['60d5ec9a6a2c1f001f8b4b6b'],
  })
  residents?: string[];

  @IsOptional()
  @IsString({ each: true })
  @ApiPropertyOptional({
    description: 'Complex id',
    example: ['60d5ec9a6a2c1f001f8b4b6b'],
  })
  vehicles?: string[];

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'Number of bedrooms',
    example: 3,
  })
  bedrooms: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'Number of bathrooms',
    example: 2,
  })
  bathrooms: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'Square meters',
    example: 100,
  })
  square_m: number;

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional({
    description: 'House is active',
    default: true,
  })
  active?: boolean;
}
