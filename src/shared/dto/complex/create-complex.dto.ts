import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { AccessPointDto } from './acces-point.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateComplexDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'The name of the complex',
    required: true,
    example: 'Complex 1',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'The address of the complex',
    required: true,
    example: 'Complex 1 Address',
  })
  address: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'The city of the complex',
    required: true,
    example: 'Complex 1 City',
  })
  city: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'The state of the complex',
    required: true,
    example: 'Complex 1 State',
  })
  state: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'The zip code of the complex',
    required: true,
    example: '12345',
  })
  zip_code: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AccessPointDto)
  // @ApiProperty({
  //   type: [AccessPointDto],
  //   description: 'The access points of the complex',
  //   required: true,
  //   example: [
  //     {
  //       name: 'Access Point 1',
  //       location: 'Access Point 1 Location',
  //       active: true,
  //       current_guard: 'Guard 1',
  //       guards: ['Guard 1', 'Guard 2'],
  //     },
  //     {
  //       name: 'Access Point 2',
  //       location: 'Access Point 2 Location',
  //       active: true,
  //       current_guard: 'Guard 2',
  //       guards: ['Guard 1', 'Guard 2'],
  //     },
  //   ],
  // })
  access_points: AccessPointDto[];

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'The contact number of the complex',
    required: true,
    example: '+15555555555',
  })
  contact_number: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    type: String,
    description: 'The email of the complex',
    required: true,
    example: 'complex@email.com',
  })
  email: string;

  @IsOptional()
  @IsArray()
  admin_ids?: string[];

  @IsOptional()
  @IsArray()
  guard_ids?: string[];

  @IsOptional()
  @IsArray()
  resident_ids?: string[];

  @IsOptional()
  @IsArray()
  house_ids?: string[];

  @IsOptional()
  @IsArray()
  vehicle_ids?: string[];

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional({
    type: Boolean,
    description: 'The status of the complex',
    default: true,
  })
  active?: boolean;
}
