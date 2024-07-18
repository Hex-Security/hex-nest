import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SetOwnerDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: "Owner's id",
    example: '60f7b3b3b3b3b3b3b3b3b3b3',
  })
  owner: string;
}
