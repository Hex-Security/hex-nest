import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateAdminDto {
  @IsNotEmpty()
  @IsString()
  admin: string;
}
