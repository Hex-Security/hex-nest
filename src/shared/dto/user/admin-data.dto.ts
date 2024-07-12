import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class AdminDataDto {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ApiPropertyOptional({
    type: String,
    description: 'List of complexes the admin is associated with',
    example: ['complex_id_1', 'complex_id_2'],
  })
  complexes?: string[];
}
