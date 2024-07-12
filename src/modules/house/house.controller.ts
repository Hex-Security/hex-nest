import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { HouseService } from './house.service';
import { HouseDocument } from 'src/shared/types/house.type';
import { CreateHouseDto, UpdateHouseDto } from 'src/shared/dto/house.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Houses')
@Controller('houses')
export class HouseController {
  constructor(private readonly house_service: HouseService) {}

  @Post()
  async create(@Body() dto: CreateHouseDto): Promise<HouseDocument> {
    return this.house_service.create(dto);
  }

  @Get()
  async findAll(): Promise<HouseDocument[]> {
    return this.house_service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<HouseDocument> {
    return this.house_service.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateHouseDto,
  ): Promise<HouseDocument> {
    return this.house_service.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<HouseDocument> {
    return this.house_service.delete(id);
  }
}
