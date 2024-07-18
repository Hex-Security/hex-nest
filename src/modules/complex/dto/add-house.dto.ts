import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddHouseDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: "House's ID",
    example: '123456789012345678901234',
  })
  house: string;
}
