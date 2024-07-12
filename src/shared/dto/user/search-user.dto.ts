import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsMobilePhone,
  IsOptional,
  IsString,
} from 'class-validator';
import { RolesEnum } from 'src/shared/enum/roles.enum';

export class SearchUserDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    type: String,
    description: "User's mongo ID",
    example: 'mongo_id',
  })
  _id?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    type: String,
    description: 'Firebase UID',
    example: 'firebase_uid',
  })
  uid?: string;

  @IsOptional()
  @IsEmail()
  @ApiPropertyOptional({
    type: String,
    description: 'Email',
    example: 'resident@email.com',
  })
  email?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    type: String,
    description: 'Username',
    example: 'username',
  })
  username?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    type: String,
    description: 'First name',
    example: 'first_name',
  })
  first_name?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    type: String,
    description: 'Last name',
    example: 'last_name',
  })
  last_name?: string;

  @IsOptional()
  @IsMobilePhone()
  @ApiPropertyOptional({
    type: String,
    description: 'Phone number',
    example: 'phone',
  })
  phone?: string;

  @IsOptional()
  @IsEnum(RolesEnum)
  @ApiPropertyOptional({
    enum: RolesEnum,
    description: 'User role',
    example: RolesEnum.USER,
  })
  role?: RolesEnum;
}
