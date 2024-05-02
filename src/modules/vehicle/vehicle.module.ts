import { Module } from '@nestjs/common';
import { VehicleService } from './vehicle.service';

@Module({
  providers: [VehicleService],
  controllers: [],
})
export class VehicleModule {}
