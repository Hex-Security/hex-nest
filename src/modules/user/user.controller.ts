import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from 'src/shared/decorator/roles.decorator';
import { RolesEnum } from 'src/shared/enum/roles.enum';
import { AuthenticationGuard } from '../auth/guard/authentication.guard';
import { ResourceAccessGuard } from '../auth/guard/resource.guard';
import { AuthorizationGuard } from '../auth/guard/authorization.guard';
import { UserService } from './user.service';
import { UserDocument } from 'src/schemas/user.schema';
import { SearchUserDto } from 'src/shared/dto/user/search-user.dto';
import { find_one } from './swagger/find-one.swagger';
import { update_one } from './swagger/update-one.swagger';
import { UpdateUserDto } from 'src/shared/dto/user/update-user.dto';
import { search_user } from './swagger/search.swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly user_service: UserService) {}

  @Get()
  @ApiBearerAuth()
  @Roles(RolesEnum.ADMIN)
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  async getAllUsers(): Promise<UserDocument[]> {
    const users: UserDocument[] = await this.user_service.findAll();

    if (!users) {
      throw new NotFoundException('No users found!!!');
    }

    return users;
  }

  @Get(':user_id')
  @ApiBearerAuth()
  @ApiOperation(find_one.operation)
  @ApiParam(find_one.param)
  @ApiResponse(find_one.ok_response)
  @Roles(RolesEnum.ADMIN, RolesEnum.USER, RolesEnum.GUARD)
  @UseGuards(AuthenticationGuard, AuthorizationGuard, ResourceAccessGuard)
  async getUser(@Param('user_id') user_id: string): Promise<UserDocument> {
    const user: UserDocument = await this.user_service.findOne(user_id);

    if (!user) {
      throw new NotFoundException(`User with uid ${user_id} not found.`);
    }

    return user;
  }

  @Put(':user_id')
  @ApiBearerAuth()
  @ApiOperation(update_one.operation)
  @ApiParam(update_one.param)
  @ApiBody(update_one.body)
  @ApiResponse(update_one.ok_response)
  @Roles(RolesEnum.ADMIN, RolesEnum.USER)
  @UseGuards(AuthenticationGuard, AuthorizationGuard, ResourceAccessGuard)
  async updateUser(
    @Param('user_id') user_id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<UserDocument> {
    const user: UserDocument = await this.user_service.update(user_id, dto);

    if (!user) {
      throw new NotFoundException(`User with uid ${user_id} not found.`);
    }

    return user;
  }

  @Post('search')
  @ApiBearerAuth()
  @ApiOperation(search_user.operation)
  @ApiBody(search_user.body)
  @ApiResponse(search_user.ok_response)
  @Roles(RolesEnum.ADMIN, RolesEnum.GUARD)
  @UseGuards(AuthenticationGuard, AuthorizationGuard, ResourceAccessGuard)
  async searchUserByEmail(@Body() dto: SearchUserDto): Promise<UserDocument> {
    const user: UserDocument = await this.user_service.search(dto);

    if (!user) {
      throw new NotFoundException(`User with email ${dto.email} not found.`);
    }

    return user;
  }
}
