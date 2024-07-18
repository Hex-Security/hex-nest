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
  ApiResponse,
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
import { SetOwnerDto } from './dto/set-owner.dto';
import { User } from 'src/schemas/user.schema';
import { AddResidentDto } from './dto/add-resident.dto';

@ApiTags('Houses')
@Controller('house')
export class HouseController {
  constructor(private readonly house_service: HouseService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation(create_house.operation)
  @ApiBody(create_house.body)
  @ApiResponse(create_house.ok_response)
  @Roles(RolesEnum.ADMIN)
  @UseGuards(AuthenticationGuard, AuthorizationGuard, ResourceAccessGuard)
  async create(@Body() dto: CreateHouseDto): Promise<HouseDocument> {
    return this.house_service.create(dto.complex, dto);
  }

  @Get()
  @ApiBearerAuth()
  @Roles(RolesEnum.DEV)
  @UseGuards(AuthenticationGuard, AuthorizationGuard, ResourceAccessGuard)
  async findAll(): Promise<HouseDocument[]> {
    return this.house_service.findAll();
  }

  @Get(':house_id')
  @ApiBearerAuth()
  @Roles(RolesEnum.ADMIN, RolesEnum.GUARD, RolesEnum.USER)
  @UseGuards(AuthenticationGuard, AuthorizationGuard, ResourceAccessGuard)
  async findOne(
    @Param() @Param('house_id') house_id: string,
  ): Promise<HouseDocument> {
    return this.house_service.findOne(house_id);
  }

  @Put(':house_id')
  @ApiBearerAuth()
  @Roles(RolesEnum.ADMIN)
  @UseGuards(AuthenticationGuard, AuthorizationGuard, ResourceAccessGuard)
  async update(
    @Param('house_id') house_id: string,
    @Body() dto: UpdateHouseDto,
  ): Promise<HouseDocument> {
    return this.house_service.update(house_id, dto);
  }

  @Delete(':house_id')
  @ApiBearerAuth()
  @Roles(RolesEnum.ADMIN)
  @UseGuards(AuthenticationGuard, AuthorizationGuard, ResourceAccessGuard)
  async remove(@Param('house_id') house_id: string): Promise<void> {
    return this.house_service.delete(house_id);
  }

  @Get(':house_id/owner')
  @ApiBearerAuth()
  @Roles(RolesEnum.ADMIN, RolesEnum.GUARD, RolesEnum.USER)
  @UseGuards(AuthenticationGuard, AuthorizationGuard, ResourceAccessGuard)
  async getOwner(@Param('house_id') house_id: string): Promise<User> {
    return this.house_service.getOwner(house_id);
  }

  @Post(':house_id/owner')
  @ApiBearerAuth()
  @Roles(RolesEnum.ADMIN)
  @UseGuards(AuthenticationGuard, AuthorizationGuard, ResourceAccessGuard)
  async setOwner(
    @Param('house_id') house_id: string,
    @Body() dto: SetOwnerDto,
  ): Promise<HouseDocument> {
    return this.house_service.setOwner(house_id, dto.owner);
  }

  @Delete(':house_id/owner')
  @ApiBearerAuth()
  @Roles(RolesEnum.ADMIN)
  @UseGuards(AuthenticationGuard, AuthorizationGuard, ResourceAccessGuard)
  async removeOwner(
    @Param('house_id') house_id: string,
  ): Promise<HouseDocument> {
    return this.house_service.removeOwner(house_id);
  }

  @Get(':house_id/residents')
  @ApiBearerAuth()
  @Roles(RolesEnum.ADMIN, RolesEnum.GUARD, RolesEnum.USER)
  @UseGuards(AuthenticationGuard, AuthorizationGuard, ResourceAccessGuard)
  async getResidents(@Param('house_id') house_id: string): Promise<User[]> {
    return this.house_service.getResidents(house_id);
  }

  @Post(':house_id/residents')
  @ApiBearerAuth()
  @Roles(RolesEnum.ADMIN)
  @UseGuards(AuthenticationGuard, AuthorizationGuard, ResourceAccessGuard)
  async addResident(
    @Param('house_id') house_id: string,
    @Body() dto: AddResidentDto,
  ): Promise<HouseDocument> {
    return this.house_service.addResident(house_id, dto.residents);
  }

  @Delete(':house_id/residents/:resident_id')
  @ApiBearerAuth()
  @Roles(RolesEnum.ADMIN, RolesEnum.USER)
  @UseGuards(AuthenticationGuard, AuthorizationGuard, ResourceAccessGuard)
  async removeResident(
    @Param('house_id') house_id: string,
    @Param('resident_id') resident_id: string,
  ): Promise<HouseDocument> {
    return this.house_service.removeResident(house_id, resident_id);
  }
}
