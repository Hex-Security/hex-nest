import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
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
import { GuardDataDto } from 'src/shared/dto/user/guard-data.dto';
import { AddGuardDto } from 'src/shared/dto/complex/add-guard.dto';

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
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  create(@Body() dto: CreateComplexDto): Promise<ComplexDocument> {
    console.log('Creating complex:', dto);
    return this.complex_service.create(dto);
  }

  @Get()
  @ApiBearerAuth()
  @Roles(RolesEnum.ADMIN)
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  findAll() {
    return this.complex_service.findAll();
  }

  @Get(':_id')
  @ApiBearerAuth()
  @ApiOperation(find_complex.operation)
  @ApiParam(find_complex.param)
  @ApiResponse(find_complex.ok_response)
  @Roles(RolesEnum.ADMIN)
  @UseGuards(AuthenticationGuard, AuthorizationGuard, ResourceAccessGuard)
  findOne(@Param('_id') _id: string) {
    return this.complex_service.findOne(_id);
  }

  @Put(':_id')
  @ApiBearerAuth()
  @ApiOperation(update_complex.operation)
  @ApiParam(update_complex.param)
  @ApiBody(update_complex.body)
  @ApiResponse(update_complex.ok_response)
  @Roles(RolesEnum.ADMIN)
  @UseGuards(AuthenticationGuard, AuthorizationGuard, ResourceAccessGuard)
  update(@Param('_id') _id: string, @Body() dto: UpdateComplexDto) {
    return this.complex_service.update(_id, dto);
  }

  @Delete(':_id')
  @ApiBearerAuth()
  @Roles(RolesEnum.DEV)
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  remove(@Param('_id') _id: string) {
    return this.complex_service.remove(_id);
  }

  @Post(':_id/guard')
  @ApiBearerAuth()
  @Roles(RolesEnum.ADMIN)
  @UseGuards(AuthenticationGuard, AuthorizationGuard, ResourceAccessGuard)
  addGuard(@Param('_id') _id: string, @Body() dto: AddGuardDto) {
    return this.complex_service.addGuard(_id, dto._id);
  }
}
