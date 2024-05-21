import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { User } from '../entity/entities/user.entity';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth_service: AuthService) {}

  @Post('sign-up')
  async register(@Body() dto: RegisterDto): Promise<User> {
    try {
      const new_user: User = await this.auth_service.register(dto);
      return new_user;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
