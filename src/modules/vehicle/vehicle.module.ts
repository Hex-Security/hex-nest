import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbModule } from '../db/db.module';
import { Vehicle } from '../entity/entities/vehicle.entity';
import { HouseModule } from '../house/house.module';
import { HouseService } from '../house/house.service';
import { VehicleService } from './vehicle.service';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle]), DbModule, HouseModule],
  providers: [VehicleService, HouseService],
  controllers: [],
  exports: [VehicleService],
})
export class VehicleModule {}
