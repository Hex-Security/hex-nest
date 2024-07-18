import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class QueryVehicleDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Owner Id',
    example: '60f1b0b3b3f3b3b3b3f3b3b4',
  })
  owner?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Vehicle Plate',
    example: 'ABC123',
  })
  plate?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Vehicle Make',
    example: 'Mazda',
  })
  make?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Vehicle Model',
    example: 'Mazda3',
  })
  model?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Vehicle Color',
    example: 'Red',
  })
  year?: number;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Vehicle Color',
    example: 'Red',
  })
  color?: string;
}
