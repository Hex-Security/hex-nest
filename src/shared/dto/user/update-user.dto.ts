import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsMobilePhone, IsOptional, IsString } from 'class-validator';
import { UserDto } from '../entities/user.dto';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    type: String,
    description: "User's username",
    example: 'new_username',
  })
  username?: string;

  @IsOptional()
  @IsMobilePhone()
  @ApiPropertyOptional({
    type: String,
    description: "User's phone number",
    example: 'new_phone',
  })
  phone?: string;

  @IsOptional()
  @IsDate()
  @ApiPropertyOptional({
    type: Date,
    description: "User's birth date",
    example: 'new_birth_date',
  })
  birth_date?: Date;
}

export class UpdatedUserDto extends UserDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    type: String,
    description: "User's username",
    example: 'new_username',
  })
  username?: string;

  @IsOptional()
  @IsMobilePhone()
  @ApiPropertyOptional({
    type: String,
    description: "User's phone number",
    example: 'new_phone',
  })
  phone?: string;

  @IsOptional()
  @IsDate()
  @ApiPropertyOptional({
    type: Date,
    description: "User's birth date",
    example: 'new_birth_date',
  })
  birth_date?: Date;
}
