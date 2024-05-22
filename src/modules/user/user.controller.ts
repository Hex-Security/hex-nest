import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserDto } from 'src/shared/dto/user.dto';
import { User } from '../entity/entities/user.entity';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly user_service: UserService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    const users: User[] = await this.user_service.findAll();

    if (!users) {
      throw new NotFoundException('No users found!!!');
    }

    return users;
  }

  @Get(':user_id')
  async getUser(@Param('user_id') user_id: string): Promise<User> {
    const user: User = await this.user_service.findOne(user_id);

    if (!user) {
      throw new NotFoundException(`User with uid ${user_id} not found.`);
    }

    return user;
  }

  @Put(':user_id')
  async updateUser(
    @Param('user_id') user_id: string,
    @Body() dto: Partial<UserDto>,
  ): Promise<User> {
    const user: User = await this.user_service.update(user_id, { ...dto });

    if (!user) {
      throw new NotFoundException(`User with uid ${user_id} not found.`);
    }

    return user;
  }

  @Get('search/:email')
  async searchUserByEmail(@Param('email') email: string): Promise<User> {
    const user: User = await this.user_service.findByEmail(email);

    if (!user) {
      throw new NotFoundException(`User with email ${email} not found.`);
    }

    return user;
  }

  @Get('search/:phone')
  async searchUserByPhone(@Param('phone') phone: string): Promise<User> {
    const user: User = await this.user_service.findByPhone(phone);

    if (!user) {
      throw new NotFoundException(`User with phone ${phone} not found.`);
    }

    return user;
  }
}
