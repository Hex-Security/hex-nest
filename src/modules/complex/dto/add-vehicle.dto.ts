import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class AddVehicleDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: "Vehicle's ID",
    example: '123456789012345678901234',
  })
  vehicle: string;
}
