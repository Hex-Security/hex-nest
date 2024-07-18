import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { HouseService } from './house.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { HouseDocument } from 'src/schemas/house.schema';
import { UpdateHouseDto } from 'src/shared/dto/house/update-house.dto';
import { CreateHouseDto } from 'src/shared/dto/house/create-house.dto';
import { create_house } from './swagger/create-house.swagger';
import { Roles } from 'src/shared/decorator/roles.decorator';
import { RolesEnum } from 'src/shared/enum/roles.enum';
import { AuthenticationGuard } from '../auth/guard/authentication.guard';
import { AuthorizationGuard } from '../auth/guard/authorization.guard';
import { ResourceAccessGuard } from '../auth/guard/resource.guard';

@ApiTags('Houses')
@Controller('complex/:complex_id/houses')
export class HouseController {
  constructor(private readonly house_service: HouseService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation(create_house.operation)
  @ApiParam(create_house.param)
  @ApiBody(create_house.body)
  @Roles(RolesEnum.ADMIN)
  @UseGuards(AuthenticationGuard, AuthorizationGuard, ResourceAccessGuard)
  async create(
    @Param('complex_id') complex_id: string,
    @Body() dto: CreateHouseDto,
  ): Promise<HouseDocument> {
    return this.house_service.create(complex_id, dto);
  }

  @Get()
  async findAllByComplex(
    @Param('complex_id') complex_id: string,
  ): Promise<HouseDocument[]> {
    return this.house_service.findAllByComplex(complex_id);
  }

  @Get(':house_id')
  async findOne(@Param('house_id') house_id: string): Promise<HouseDocument> {
    return this.house_service.findOne(house_id);
  }

  @Put(':house_id')
  async update(
    @Param('house_id') house_id: string,
    @Body() dto: UpdateHouseDto,
  ): Promise<HouseDocument> {
    return this.house_service.update(house_id, dto);
  }

  @Delete(':house_id')
  async remove(@Param('house_id') house_id: string): Promise<void> {
    return this.house_service.delete(house_id);
  }
}
