import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddGuardDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'The guard ID',
    required: true,
    example: 'guard_id',
  })
  _id: string;
}
