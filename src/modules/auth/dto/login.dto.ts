import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  emailOrUsername: string;

  @IsString()
  password: string;
}
