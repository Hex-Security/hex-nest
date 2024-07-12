import { Module } from '@nestjs/common';
import { VehicleController } from './vehicle.controller';
import { VehicleService } from './vehicle.service';
import { EntityModule } from '../entity/entity.module';

@Module({
  imports: [EntityModule],
  providers: [VehicleService],
  controllers: [VehicleController],
  exports: [VehicleService],
})
export class VehicleModule {}
