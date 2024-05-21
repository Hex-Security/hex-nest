import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { HouseDto } from 'src/shared/dto/house.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { House } from '../entity/entities/house.entity';
import { User } from '../entity/entities/user.entity';
import { Vehicle } from '../entity/entities/vehicle.entity';
import { HouseService } from './house.service';

@Controller('complex/:complex_id/house')
export class HouseController {
  constructor(private house_service: HouseService) {}

  @Get()
  async findAllHousesByComplex(
    @Param('complex_id') complex_id: string,
  ): Promise<House[]> {
    return this.house_service.findAllByComplex(complex_id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createHouse(@Body() dto: HouseDto): Promise<House> {
    return this.house_service.create(dto);
  }

  @Put(':house_id')
  async updateHouse(
    @Param('house_id') house_id: string,
    @Body() dto: Partial<HouseDto>,
  ): Promise<UpdateResult> {
    return this.house_service.update(house_id, dto);
  }

  @Delete(':house_id')
  async deleteHouse(
    @Param('house_id') house_id: string,
  ): Promise<DeleteResult> {
    return this.house_service.delete(house_id);
  }

  @Get(':house_id')
  async findOneHouse(@Param('house_id') house_id: string): Promise<House> {
    return this.house_service.findOne(house_id);
  }

  @Get(':house_id/residents')
  async findAllResidents(
    @Param('id') id: string,
    @Param('house_id') house_id: string,
  ): Promise<User[]> {
    return this.house_service.findAllResidents(house_id);
  }

  @Post(':house_id/residents')
  @HttpCode(HttpStatus.CREATED)
  async addResident(
    @Param('house_id') house_id: string,
    @Body() dto: { resident_id: string },
  ): Promise<House> {
    return this.house_service.addResident(house_id, dto.resident_id);
  }

  @Get(':house_id/residents/:resident_id')
  async findOneResident(
    @Param('house_id') house_id: string,
    @Param('resident_id') resident_id: string,
  ): Promise<User> {
    return this.house_service.findOneResident(house_id, resident_id);
  }

  @Delete(':house_id/residents/:resident_id')
  async removeResident(
    @Param('house_id') house_id: string,
    @Param('resident_id') resident_id: string,
  ): Promise<House> {
    return this.house_service.removeResident(house_id, resident_id);
  }

  @Get(':house_id/vehicles')
  async findAllVehicles(
    @Param('house_id') house_id: string,
  ): Promise<Vehicle[]> {
    return this.house_service.findAllVehicles(house_id);
  }

  @Post(':house_id/vehicles')
  @HttpCode(HttpStatus.CREATED)
  async addVehicle(
    @Param('house_id') house_id: string,
    @Body() dto: { vehicle_id: string },
  ): Promise<House> {
    return this.house_service.addVehicle(house_id, dto.vehicle_id);
  }

  @Get(':house_id/vehicles/:vehicle_id')
  async findOneVehicle(
    @Param('house_id') house_id: string,
    @Param('vehicle_id') vehicle_id: string,
  ): Promise<Vehicle> {
    return this.house_service.findOneVehicle(house_id, vehicle_id);
  }

  @Delete(':house_id/vehicles/:vehicle_id')
  async removeVehicle(
    @Param('house_id') house_id: string,
    @Param('vehicle_id') vehicle_id: string,
  ): Promise<House> {
    return this.house_service.removeVehicle(house_id, vehicle_id);
  }
}
