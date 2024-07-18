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
import {
  CreateHouseDto,
  UpdateHouseDto,
} from 'src/shared/dto/entities/house.dto';
import { ApiTags } from '@nestjs/swagger';
import { HouseDocument } from 'src/schemas/house.schema';

@ApiTags('Houses')
@Controller('complex/:_cid/houses')
export class HouseController {
  constructor(private readonly house_service: HouseService) {}

  @Post()
  async create(
    @Param('_cid') complex_id: string,
    @Body() dto: CreateHouseDto,
  ): Promise<HouseDocument> {
    return this.house_service.create(complex_id, dto);
  }

  @Get()
  async findAllByComplex(
    @Param('_cid') complex_id: string,
  ): Promise<HouseDocument[]> {
    return this.house_service.findAllByComplex(complex_id);
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
