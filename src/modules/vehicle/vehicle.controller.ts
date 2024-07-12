import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import {
  CreateVehicleDto,
  UpdateVehicleDto,
} from 'src/shared/dto/entities/vehicle.dto';
import { ApiTags } from '@nestjs/swagger';
import { VehicleDocument } from 'src/schemas/vehicle.schema';

@ApiTags('Vehicles')
@Controller('vehicles')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Post()
  async create(@Body() dto: CreateVehicleDto): Promise<VehicleDocument> {
    return this.vehicleService.create(dto);
  }

  @Get()
  async findAll(): Promise<VehicleDocument[]> {
    return this.vehicleService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<VehicleDocument> {
    return this.vehicleService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateVehicleDto,
  ): Promise<VehicleDocument> {
    return this.vehicleService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<VehicleDocument> {
    return this.vehicleService.delete(id);
  }
}
