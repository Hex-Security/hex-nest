import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class HouseDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: "House's Owner ID",
    example: '123456789012345678901234',
  })
  owner_id: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'Number of bedrooms',
    example: 3,
  })
  bedrooms: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'Number of bathrooms',
    example: 2,
  })
  bathrooms: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'Square meters of the property',
    example: 100,
  })
  square_m: number;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({
    description: 'Is the property active?',
    default: true,
  })
  active: boolean;
}
