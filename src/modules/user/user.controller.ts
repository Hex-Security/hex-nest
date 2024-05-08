import { Controller, Get, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../entity/entities/user.entity';

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

  @Get(':uid')
  async getUser(uid: string): Promise<User> {
    const user: User = await this.user_service.findOne(uid);

    if (!user) {
      throw new NotFoundException(`User with uid ${uid} not found.`);
    }

    return user;
  }
}
