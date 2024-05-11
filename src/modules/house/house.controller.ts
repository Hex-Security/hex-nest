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
import { House } from '../entity/entities/house.entity';
import { User } from '../entity/entities/user.entity';
import { HouseService } from './house.service';

@Controller('complex/:complex_id/house')
export class HouseController {
  constructor(private house_service: HouseService) {}

  @Post(':house_id')
  @HttpCode(HttpStatus.CREATED)
  async createHouse(@Body() dto: HouseDto): Promise<House> {
    return this.house_service.create(dto);
  }

  @Put(':house_id')
  async updateHouse(
    @Param('house_id') house_id: string,
    @Body() dto: Partial<House>,
  ): Promise<House> {
    return this.house_service.update(house_id, dto);
  }

  @Delete(':house_id')
  async deleteHouse(@Param('house_id') house_id: string): Promise<House> {
    return this.house_service.remove(house_id);
  }

  @Get()
  async findAllHouses(@Param('complex_id') id: string): Promise<House[]> {
    return this.house_service.findAll(id);
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

  @Get(':house_id/residents/:resident_id')
  async findOneResident(
    @Param('house_id') house_id: string,
    @Param('resident_id') resident_id: string,
  ): Promise<User> {
    return this.house_service.findOneResident(house_id, resident_id);
  }
}
