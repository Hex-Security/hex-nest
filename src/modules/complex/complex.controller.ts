import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { ComplexService } from './complex.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { create_complex } from './swagger/create-complex.swagger';
import { CreateComplexDto } from 'src/shared/dto/complex/create-complex.dto';
import { UpdateComplexDto } from 'src/shared/dto/complex/update-complex.dto';
import { Roles } from 'src/shared/decorator/roles.decorator';
import { RolesEnum } from 'src/shared/enum/roles.enum';
import { AuthenticationGuard } from '../auth/guard/authentication.guard';
import { AuthorizationGuard } from '../auth/guard/authorization.guard';
import { ComplexDocument } from 'src/schemas/complex.schema';
import { ResourceAccessGuard } from '../auth/guard/resource.guard';
import { find_complex } from './swagger/find-complex.swagger';
import { update_complex } from './swagger/update-complex.swagger';
import { AddGuardDto } from 'src/shared/dto/complex/add-guard.dto';
import { User } from 'src/schemas/user.schema';
import { AddAdminDto } from 'src/shared/dto/complex/add-admin.dto';

@ApiTags('Complex')
@Controller('complex')
export class ComplexController {
  constructor(private readonly complex_service: ComplexService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation(create_complex.operation)
  @ApiBody(create_complex.body)
  @ApiResponse(create_complex.ok_response)
  @Roles(RolesEnum.DEV)
  @UseGuards(AuthenticationGuard, AuthorizationGuard, ResourceAccessGuard)
  create(@Body() dto: CreateComplexDto): Promise<ComplexDocument> {
    console.log('Creating complex:', dto);
    return this.complex_service.create(dto);
  }

  @Get()
  @ApiBearerAuth()
  @Roles(RolesEnum.ADMIN)
  @UseGuards(AuthenticationGuard, AuthorizationGuard, ResourceAccessGuard)
  findAll() {
    return this.complex_service.findAll();
  }

  @Get(':complex_id')
  @ApiBearerAuth()
  @ApiOperation(find_complex.operation)
  @ApiParam(find_complex.param)
  @ApiResponse(find_complex.ok_response)
  @Roles(RolesEnum.ADMIN)
  @UseGuards(AuthenticationGuard, AuthorizationGuard, ResourceAccessGuard)
  findOne(@Param('complex_id') complex_id: string) {
    return this.complex_service.findOne(complex_id);
  }

  @Put(':complex_id')
  @ApiBearerAuth()
  @ApiOperation(update_complex.operation)
  @ApiParam(update_complex.param)
  @ApiBody(update_complex.body)
  @ApiResponse(update_complex.ok_response)
  @Roles(RolesEnum.ADMIN)
  @UseGuards(AuthenticationGuard, AuthorizationGuard, ResourceAccessGuard)
  update(
    @Param('complex_id') complex_id: string,
    @Body() dto: UpdateComplexDto,
  ) {
    return this.complex_service.update(complex_id, dto);
  }

  @Delete(':complex_id')
  @ApiBearerAuth()
  @Roles(RolesEnum.DEV)
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  remove(@Param('complex_id') complex_id: string) {
    return this.complex_service.remove(complex_id);
  }

  @Post(':complex_id/guard')
  @ApiBearerAuth()
  @Roles(RolesEnum.ADMIN)
  @UseGuards(AuthenticationGuard, AuthorizationGuard, ResourceAccessGuard)
  addGuard(@Param('complex_id') complex_id: string, @Body() dto: AddGuardDto) {
    return this.complex_service.addGuard(complex_id, dto._id);
  }

  @Get(':complex_id/guard')
  @ApiBearerAuth()
  @Roles(RolesEnum.ADMIN)
  @UseGuards(AuthenticationGuard, AuthorizationGuard, ResourceAccessGuard)
  findGuards(@Param('complex_id') complex_id: string): Promise<User[]> {
    return this.complex_service.findGuards(complex_id);
  }

  @Delete(':complex_id/guard/:guard_id')
  @ApiBearerAuth()
  @Roles(RolesEnum.ADMIN)
  @UseGuards(AuthenticationGuard, AuthorizationGuard, ResourceAccessGuard)
  removeGuard(
    @Param('complex_id') complex_id: string,
    @Param('guard_id') guard_id: string,
  ) {
    return this.complex_service.removeGuard(complex_id, guard_id);
  }

  @Post(':complex_id/admin')
  @ApiBearerAuth()
  @Roles(RolesEnum.ADMIN)
  @UseGuards(AuthenticationGuard, AuthorizationGuard, ResourceAccessGuard)
  addAdmin(@Param('complex_id') complex_id: string, @Body() dto: AddAdminDto) {
    return this.complex_service.addAdmin(complex_id, dto._id);
  }

  @Get(':complex_id/admin')
  @ApiBearerAuth()
  @Roles(RolesEnum.ADMIN)
  @UseGuards(AuthenticationGuard, AuthorizationGuard, ResourceAccessGuard)
  findAdmins(@Param('complex_id') complex_id: string): Promise<User[]> {
    return this.complex_service.findAdmins(complex_id);
  }

  @Delete(':complex_id/admin/:admin_id')
  @ApiBearerAuth()
  @Roles(RolesEnum.ADMIN)
  @UseGuards(AuthenticationGuard, AuthorizationGuard, ResourceAccessGuard)
  removeAdmin(
    @Param('complex_id') complex_id: string,
    @Param('admin_id') admin_id: string,
  ) {
    return this.complex_service.removeAdmin(complex_id, admin_id);
  }
}
