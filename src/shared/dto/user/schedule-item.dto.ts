import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsString, isString } from 'class-validator';

export class ScheduleItemDto {
  @IsNotEmpty()
  @IsDate()
  @ApiProperty({
    type: Date,
    description: 'The date of the schedule item',
    example: '2021-08-12T00:00:00.000Z',
  })
  date: Date;

  @IsNotEmpty()
  @IsDate()
  @ApiProperty({
    type: String,
    description: 'The start time of the schedule item',
    example: '08:00',
  })
  start: Date;

  @IsNotEmpty()
  @IsDate()
  @ApiProperty({
    type: String,
    description: 'The end time of the schedule item',
    example: '17:00',
  })
  end: Date;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'The complex id of the schedule item',
    example: 'complex_id',
  })
  complex: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'The access point name of the schedule item',
    example: 'access_point_name',
  })
  access_point: string;
}
