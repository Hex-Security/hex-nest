import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Status } from 'src/shared/enum/status.enum';

export class AccessDto {
  @IsString()
  reason: string;

  @IsString()
  document: string;

  @IsEnum(Status)
  status: Status;

  @IsOptional()
  @IsString()
  approver_id: string;

  @IsString()
  requester_id: string;

  @IsString()
  visitor_id: string;

  @IsOptional()
  @IsString()
  vehicle_id: string;

  @IsString()
  house_id: string;

  @IsOptional()
  @IsString()
  requested_at: Date;
}
