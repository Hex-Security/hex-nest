import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { ScheduleItemDto } from './schedule-item.dto';

export class GuardDataDto {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ApiPropertyOptional({
    type: String,
    description: 'List of complexes the guard is associated with',
    example: ['complex_id_1', 'complex_id_2'],
  })
  complexes?: string[];

  @IsOptional()
  @IsArray()
  @Type(() => ScheduleItemDto)
  @ApiPropertyOptional({
    type: ScheduleItemDto,
    description: 'List of schedules for the guard',
    example: [
      {
        day: 'monday',
        start: '08:00',
        end: '17:00',
        complex: 'complex_id',
        access_point: 'access_point_name',
      },
    ],
  })
  schedules?: ScheduleItemDto[];
}
