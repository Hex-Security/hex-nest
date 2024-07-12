import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { ResidentDataDto } from './resident-data.dto';
import { GuardDataDto } from './guard-data.dto';
import { AdminDataDto } from './admin-data.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UserDataDto {
  @IsOptional()
  @Type(() => ResidentDataDto)
  @ApiPropertyOptional({
    type: ResidentDataDto,
    description: 'Resident data',
  })
  user?: ResidentDataDto;

  @IsOptional()
  @Type(() => GuardDataDto)
  @ApiPropertyOptional({
    type: GuardDataDto,
    description: 'Guard data',
  })
  guard?: GuardDataDto;

  @IsOptional()
  @Type(() => AdminDataDto)
  @ApiPropertyOptional({
    type: AdminDataDto,
    description: 'Admin data',
  })
  admin?: AdminDataDto;
}
