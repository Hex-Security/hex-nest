import { Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {

  constructor(private auth_service: AuthService) {}

  @Post('login')
  async login(@Body() dto: LoginDto): Promise<LoginResponse> {
    try {
      const response: LoginResponse = await this.auth_service.login(dto);
      return response;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  @Post('register')
  async register(@Body() dto: RegisterDto): Promise<RegisterResponse> {
    try {
      const response: RegisterResponse = await this.auth_service.register(dto);
      return response;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
