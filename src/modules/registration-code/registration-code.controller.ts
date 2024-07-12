import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { RegistrationCodeService } from './registration-code.service';
import { CreateRegistrationCodeDto } from 'src/shared/dto/registration-code/create-registration-code.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from 'src/shared/decorator/roles.decorator';
import { RolesEnum } from 'src/shared/enum/roles.enum';
import { AuthenticationGuard } from '../auth/guard/authentication.guard';
import { AuthorizationGuard } from '../auth/guard/authorization.guard';
import { ResourceAccessGuard } from '../auth/guard/resource.guard';
import { create_code } from './swagger/create-code.swagger';

@ApiTags('Registration Code')
@Controller('auth/registration-code')
export class RegistrationCodeController {
  constructor(private readonly code_service: RegistrationCodeService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation(create_code.operation)
  @ApiBody(create_code.body)
  @ApiResponse(create_code.ok_response)
  @Roles(RolesEnum.ADMIN)
  @UseGuards(AuthenticationGuard, AuthorizationGuard, ResourceAccessGuard)
  async create(@Body() dto: CreateRegistrationCodeDto) {
    return this.code_service.create(dto);
  }
}
