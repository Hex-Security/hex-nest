import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class ResidentDataDto {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ApiPropertyOptional({
    type: String,
    description: 'List of houses the resident is associated with',
    example: ['house_id_1', 'house_id_2'],
  })
  houses?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ApiPropertyOptional({
    type: String,
    description: 'List of vehicles the resident is associated with',
    example: ['vehicle_id_1', 'vehicle_id_2'],
  })
  vehicles?: string[];
}
