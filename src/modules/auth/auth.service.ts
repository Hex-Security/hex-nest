import { Injectable } from '@nestjs/common';
import { User } from '../entity/entities/user.entity';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private readonly user_service: UserService) {}

  async register(dto: RegisterDto): Promise<User> {
    const { email, password, first_name, last_name, phone, username } = dto;

    return null;
  }
}
