import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import mongoose from 'mongoose';
import { AccessStatus } from '../../enum/access.enum';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';

export class CreateAccessDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Visitor ID',
    example: '60f8c1f7d9f1f9001f3d5d1',
  })
  visitor: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'House ID',
    example: '60f8c1f7d9f1f9001f3d5d1',
  })
  house: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Complex ID',
    example: '60f8c1f7d9f1f9001f3d5d1',
  })
  complex: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'Vehicle ID',
    example: '60f8c1f7d9f1f9001f3d5d1',
  })
  vehicle?: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Requested by',
    example: '60f8c1f7d9f1f9001f3d5d1',
  })
  requested_by: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'Approved by',
    example: '60f8c1f7d9f1f9001f3d5d1',
  })
  approved_by?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'Assigned guard ID',
    example: '60f8c1f7d9f1f9001f3d5d1',
  })
  assigned_guard_id?: string;

  @IsNotEmpty()
  @IsDate()
  @ApiProperty({
    description: 'Expected arrival date',
    example: '2021-07-23T00:00:00.000Z',
  })
  expected_arrival: Date;

  @IsOptional()
  @IsDate()
  @ApiPropertyOptional({
    description: 'Expected departure date',
    example: '2021-07-23T00:00:00.000Z',
  })
  expected_departure?: Date;

  @IsOptional()
  @IsDate()
  @ApiPropertyOptional({
    description: 'Actual arrival date',
    example: '2021-07-23T00:00:00.000Z',
  })
  actual_arrival?: Date;

  @IsOptional()
  @IsDate()
  @ApiPropertyOptional({
    description: 'Actual departure date',
    example: '2021-07-23T00:00:00.000Z',
  })
  actual_departure?: Date;

  @IsNotEmpty()
  @IsEnum(AccessStatus)
  @ApiProperty({
    description: 'Access status',
    example: AccessStatus.APPROVED,
  })
  status: AccessStatus;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Purpose of visit',
    example: 'Visit',
  })
  purpose: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'Notes',
    example: 'Notes',
  })
  notes?: string;
}

export class UpdateAccessDto extends PartialType(CreateAccessDto) {}
