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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/shared/decorator/roles.decorator';
import { UpdateUserDto } from 'src/shared/dto/entities/user.dto';
import { RolesEnum } from 'src/shared/enum/roles.enum';
import { AuthenticationGuard } from '../auth/guard/authentication.guard';
import { ResourceAccessGuard } from '../auth/guard/resource.guard';
import { AuthorizationGuard } from '../auth/guard/authorization.guard';
import { UserService } from './user.service';
import { UserDocument } from 'src/schemas/user.schema';
import { SearchUserDto } from 'src/shared/dto/user/search-user.dto';

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

  @Get(':_id')
  @ApiBearerAuth()
  @Roles(RolesEnum.ADMIN, RolesEnum.USER, RolesEnum.GUARD)
  @UseGuards(AuthenticationGuard, AuthorizationGuard, ResourceAccessGuard)
  async getUser(@Param('_id') _id: string): Promise<UserDocument> {
    const user: UserDocument = await this.user_service.findOne(_id);

    if (!user) {
      throw new NotFoundException(`User with uid ${_id} not found.`);
    }

    return user;
  }

  @Put(':_id')
  async updateUser(
    @Param('_id') _id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<UserDocument> {
    const user: UserDocument = await this.user_service.update(_id, dto);

    if (!user) {
      throw new NotFoundException(`User with uid ${_id} not found.`);
    }

    return user;
  }

  @Post('search')
  async searchUserByEmail(@Body() dto: SearchUserDto): Promise<UserDocument> {
    const user: UserDocument = await this.user_service.search(dto);

    if (!user) {
      throw new NotFoundException(`User with email ${email} not found.`);
    }

    return user;
  }
}
