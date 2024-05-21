import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { VehicleDto } from 'src/shared/dto/vehicle.dto';
import { UpdateResult } from 'typeorm';
import { Vehicle } from '../entity/entities/vehicle.entity';
import { VehicleService } from './vehicle.service';

@Controller('complex/:complex_id/house/:house_id/vehicle')
export class VehicleController {
  constructor(private vehicle_service: VehicleService) {}

  @Get()
  async findAllVehiclesByComplexAndHouse(
    @Param('complex_id') complex_id: string,
    @Param('house_id') house_id: string,
  ): Promise<Vehicle[]> {
    return this.vehicle_service.findAllByComplexAndHouse(complex_id, house_id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createVehicle(
    @Param('house_id') house_id: string,
    @Body() dto: VehicleDto,
  ): Promise<Vehicle> {
    return this.vehicle_service.create(house_id, dto);
  }

  @Get(':vehicle_id')
  async findVehicleById(
    @Param('vehicle_id') vehicle_id: string,
  ): Promise<Vehicle> {
    return this.vehicle_service.findOne(vehicle_id);
  }

  @Put('/:vehicle_id')
  async updateVehicle(
    @Param('vehicle_id') vehicle_id: string,
    @Body() dto: VehicleDto,
  ): Promise<UpdateResult> {
    return this.vehicle_service.update(vehicle_id, dto);
  }
}
