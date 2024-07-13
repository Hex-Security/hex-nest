import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class AccessPointDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'The name of the access point',
    required: true,
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'The location of the access point',
    required: true,
  })
  location: string;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({
    type: Boolean,
    description: 'Whether the access point is active or not',
    required: true,
    default: true,
  })
  active: boolean;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    type: String,
    description: 'The current guard of the access point',
  })
  current_guard: string;

  @IsArray()
  @IsString({ each: true })
  @ApiPropertyOptional({
    type: [String],
    description: "The guards' ids of the access point",
  })
  guards: string[];
}
