import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { VisitorService } from './visitor.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { VisitorDocument } from 'src/schemas/visitor.schema';
import { Roles } from 'src/shared/decorator/roles.decorator';
import { RolesEnum } from 'src/shared/enum/roles.enum';
import { AuthenticationGuard } from '../auth/guard/authentication.guard';
import { AuthorizationGuard } from '../auth/guard/authorization.guard';
import { ResourceAccessGuard } from '../auth/guard/resource.guard';
import { CreateVisitorDto } from 'src/shared/dto/visitor/create-visitor.dto';
import { create_visitor } from './swagger/create-visitor.swagger';
import { UpdateVisitorDto } from 'src/shared/dto/visitor/update-visitor.dto';
import { ReqWithUser } from 'src/shared/interfaces/req-with-user.interface';

@ApiTags('Visitors')
@Controller('visitors')
export class VisitorController {
  constructor(private readonly visitorService: VisitorService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation(create_visitor.operation)
  @ApiBody(create_visitor.body)
  @ApiResponse(create_visitor.ok_response)
  @Roles(RolesEnum.ADMIN, RolesEnum.GUARD, RolesEnum.USER)
  @UseGuards(AuthenticationGuard, AuthorizationGuard, ResourceAccessGuard)
  async create(
    @Req() req: ReqWithUser,
    @Body() dto: CreateVisitorDto,
  ): Promise<VisitorDocument> {
    return this.visitorService.create(req.user.toObject(), dto);
  }

  @Get()
  async findAll(): Promise<VisitorDocument[]> {
    return this.visitorService.findAll();
  }

  @Get(':visitor_id')
  async findOne(
    @Param('visitor_id') visitor_id: string,
  ): Promise<VisitorDocument> {
    return this.visitorService.findOne(visitor_id);
  }

  @Put(':visitor_id')
  async update(
    @Param('visitor_id') visitor_id: string,
    @Body() dto: UpdateVisitorDto,
  ): Promise<VisitorDocument> {
    return this.visitorService.update(visitor_id, dto);
  }

  @Delete(':visitor_id')
  async remove(
    @Param('visitor_id') visitor_id: string,
  ): Promise<VisitorDocument> {
    return this.visitorService.delete(visitor_id);
  }
}
