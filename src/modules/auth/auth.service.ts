import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly user_service: UserService) {}

  async login(dto: LoginDto): Promise<LoginResponse> {
    return { message: 'Login successful.' };
  }

  async register(dto: RegisterDto): Promise<RegisterResponse> {
    const user: User = await this.user_service.create(dto);

    return { message: 'Registration successful.' };
  }
}
