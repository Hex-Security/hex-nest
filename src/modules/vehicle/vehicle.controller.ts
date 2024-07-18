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
import { VehicleService } from './vehicle.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { VehicleDocument } from 'src/schemas/vehicle.schema';
import { Roles } from 'src/shared/decorator/roles.decorator';
import { RolesEnum } from 'src/shared/enum/roles.enum';
import { AuthenticationGuard } from '../auth/guard/authentication.guard';
import { AuthorizationGuard } from '../auth/guard/authorization.guard';
import { ResourceAccessGuard } from '../auth/guard/resource.guard';
import { CreateVehicleDto } from 'src/shared/dto/vehicle/create-vehicle.dto';
import { UpdateVehicleDto } from 'src/shared/dto/vehicle/update-vehicle.dto';
import { create_vehicle } from './swagger/create-vehicle.swagger';
import { QueryVehicleDto } from 'src/shared/dto/vehicle/query-vehicle.dto';

@ApiTags('Vehicles')
@Controller('vehicles')
export class VehicleController {
  constructor(private readonly vehicle_service: VehicleService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation(create_vehicle.operation)
  @ApiBody(create_vehicle.body)
  @ApiResponse(create_vehicle.ok_response)
  @Roles(RolesEnum.ADMIN, RolesEnum.GUARD, RolesEnum.USER)
  @UseGuards(AuthenticationGuard, AuthorizationGuard, ResourceAccessGuard)
  async create(@Body() dto: CreateVehicleDto): Promise<VehicleDocument> {
    return this.vehicle_service.create(dto);
  }

  @Get()
  @ApiBearerAuth()
  @Roles(RolesEnum.DEV)
  @UseGuards(AuthenticationGuard, AuthorizationGuard, ResourceAccessGuard)
  async findAll(): Promise<VehicleDocument[]> {
    return this.vehicle_service.findAll();
  }

  @Get(':vehicle_id')
  @ApiBearerAuth()
  @Roles(RolesEnum.ADMIN, RolesEnum.GUARD, RolesEnum.USER)
  @UseGuards(AuthenticationGuard, AuthorizationGuard, ResourceAccessGuard)
  async findOne(
    @Param('vehicle_id') vehicle_id: string,
  ): Promise<VehicleDocument> {
    return this.vehicle_service.findOne(vehicle_id);
  }

  @Put(':id')
  @ApiBearerAuth()
  @Roles(RolesEnum.ADMIN, RolesEnum.USER)
  @UseGuards(AuthenticationGuard, AuthorizationGuard, ResourceAccessGuard)
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateVehicleDto,
  ): Promise<VehicleDocument> {
    return this.vehicle_service.update(id, dto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @Roles(RolesEnum.ADMIN, RolesEnum.USER)
  @UseGuards(AuthenticationGuard, AuthorizationGuard, ResourceAccessGuard)
  async remove(@Param('id') id: string): Promise<VehicleDocument> {
    return this.vehicle_service.delete(id);
  }

  @Post('/query')
  @ApiBearerAuth()
  @Roles(RolesEnum.ADMIN, RolesEnum.GUARD)
  @UseGuards(AuthenticationGuard, AuthorizationGuard, ResourceAccessGuard)
  async query(@Body() query: QueryVehicleDto): Promise<VehicleDocument[]> {
    return this.vehicle_service.query(query);
  }
}
