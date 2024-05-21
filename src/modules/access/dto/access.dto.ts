import { IsOptional, IsString } from 'class-validator';

export class AccessDto {
  @IsString()
  reason: string;

  @IsString()
  document: string;

  @IsString()
  status: string;

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
