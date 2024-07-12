import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDate,
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { UserDataDto } from '../user/user-data.dto';
import { Type } from 'class-transformer';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: "User's mongo ID",
    example: 'mongo_id',
  })
  _id: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: "User's Firebase UID",
    example: 'firebase_uid',
  })
  uid: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    type: String,
    description: "User's email",
    example: 'email',
  })
  email: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    type: String,
    description: "User's username",
    example: 'username',
  })
  username?: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: "User's first name",
    example: 'first_name',
  })
  first_name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: "User's last name",
    example: 'last_name',
  })
  last_name: string;

  @IsOptional()
  @IsMobilePhone()
  @ApiPropertyOptional({
    type: String,
    description: "User's phone number",
    example: 'phone',
  })
  phone?: string;

  @IsOptional()
  @IsDate()
  @ApiPropertyOptional({
    type: Date,
    description: "User's birth date",
    example: 'birth_date',
  })
  birth_date?: Date;

  @IsOptional()
  @Type(() => UserDataDto)
  @ApiPropertyOptional({
    type: UserDataDto,
    description: "User's data",
  })
  data?: UserDataDto;
}
