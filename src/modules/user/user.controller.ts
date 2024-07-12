import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/shared/decorator/roles.decorator';
import { UpdateUserDto } from 'src/shared/dto/user.dto';
import { RolesEnum } from 'src/shared/enum/roles.enum';
import { UserDocument } from 'src/shared/types/user.type';
import { AuthorizationGuard } from '../auth/guard/authorization.guard';
import { ResourceAccessGuard } from '../auth/guard/resource.guard';
import { RolesGuard } from '../auth/guard/roles.guard';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly user_service: UserService) {}

  @Get()
  @ApiBearerAuth()
  @Roles(RolesEnum.ADMIN, RolesEnum.USER, RolesEnum.GUARD)
  @UseGuards(AuthorizationGuard, RolesGuard)
  async getAllUsers(): Promise<UserDocument[]> {
    const users: UserDocument[] = await this.user_service.findAll();

    if (!users) {
      throw new NotFoundException('No users found!!!');
    }

    return users;
  }

  @Get(':user_id')
  @ApiBearerAuth()
  @Roles(RolesEnum.ADMIN, RolesEnum.USER, RolesEnum.GUARD)
  @UseGuards(AuthorizationGuard, ResourceAccessGuard, RolesGuard)
  async getUser(@Param('user_id') user_id: string): Promise<UserDocument> {
    const user: UserDocument = await this.user_service.findOne(user_id);

    if (!user) {
      throw new NotFoundException(`User with uid ${user_id} not found.`);
    }

    return user;
  }

  @Put(':user_id')
  async updateUser(
    @Param('user_id') user_id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<UserDocument> {
    const user: UserDocument = await this.user_service.update(user_id, {
      ...dto,
    });

    if (!user) {
      throw new NotFoundException(`User with uid ${user_id} not found.`);
    }

    return user;
  }

  @Get('search/:email')
  async searchUserByEmail(
    @Param('email') email: string,
  ): Promise<UserDocument> {
    const user: UserDocument = await this.user_service.findByEmail(email);

    if (!user) {
      throw new NotFoundException(`User with email ${email} not found.`);
    }

    return user;
  }

  @Get('search/:phone')
  async searchUserByPhone(
    @Param('phone') phone: string,
  ): Promise<UserDocument> {
    const user: UserDocument = await this.user_service.findByPhone(phone);

    if (!user) {
      throw new NotFoundException(`User with phone ${phone} not found.`);
    }

    return user;
  }
}
