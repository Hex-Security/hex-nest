import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { TokenDto } from './dto/token.dto';
import { User } from '../entity/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth_service: AuthService) {}

  @Post('token') // NOTE - Thjs endpoint is only for development purposes
  async getUserToken(@Body() dto: LoginDto): Promise<TokenDto> {
    try {
      const token: TokenDto = await this.auth_service.getUserToken(dto);
      return token;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

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
