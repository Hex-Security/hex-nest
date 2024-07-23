import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateVehicleDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Owner Id',
    example: '60f1b0b3b3f3b3b3b3f3b3b4',
  })
  owner: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Visitor Id',
    example: '60f1b0b3b3f3b3b3b3f3b3b4',
  })
  owner_visitor: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Vehicle complex',
    example: '60f1b0b3b3f3b3b3b3f3b3b4',
  })
  complex: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Vehicle Plate',
    example: 'ABC123',
  })
  plate: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Vehicle Make',
    example: 'Mazda',
  })
  make: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Vehicle Model',
    example: 'Mazda3',
  })
  model: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    type: Number,
    description: 'Vehicle Year',
    example: 2021,
  })
  year: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Vehicle Color',
    example: 'Red',
  })
  color: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    type: Boolean,
    description: 'Vehicle Active',
    example: true,
  })
  active?: boolean;
}
