import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'User email or username',
    example: 'resident@email.com',
  })
  emailOrUsername: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'User password',
    example: 'password123!--',
  })
  password: string;
}
