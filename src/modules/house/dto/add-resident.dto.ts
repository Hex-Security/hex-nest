import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class AddResidentDto {
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  @ApiProperty({
    type: [String],
    description: "Residents's id",
    example: ['60f7b3b3b3b3b3b3b3b3b3'],
  })
  residents: string[];
}
