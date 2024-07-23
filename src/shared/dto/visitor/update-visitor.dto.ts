import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsMobilePhone,
  IsOptional,
  IsString,
} from 'class-validator';
import { VisitorStatus } from 'src/shared/enum/visitor.enum';

export class UpdateVisitorDto {
  @IsOptional()
  @IsEmail()
  @ApiPropertyOptional({
    description: 'Email',
    example: 'visitor@email.com',
  })
  email?: string;

  @IsOptional()
  @IsMobilePhone()
  @ApiPropertyOptional({
    description: 'Phone number',
    example: '1234567890',
  })
  phone?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'ID number',
    example: '1234567890',
  })
  id_number?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'Vehicle ID',
    example: '60f1b0b3b3f3b3b3b3f3b3b3',
  })
  vehicle?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'Host ID',
    example: '60f1b0b3b3f3b3b3b3f3b3b3',
  })
  approved_by?: string;

  @IsOptional()
  @IsEnum({ type: 'enum', enum: VisitorStatus })
  @ApiPropertyOptional({
    description: 'Visitor status',
    example: VisitorStatus.PENDING,
  })
  status?: VisitorStatus;
}
