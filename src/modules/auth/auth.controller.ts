import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FirebaseToken } from 'src/shared/dto/firebase/token.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { SignupResponseDto } from './dto/signup-response.dto';
import { login } from './swagger/login.swagger';
import { signup } from './swagger/signup.swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly auth_service: AuthService) {}

  @Post('sign-up')
  @ApiOperation(signup.operation)
  @ApiBody(signup.body)
  async register(@Body() dto: RegisterDto): Promise<SignupResponseDto> {
    try {
      const user_token = await this.auth_service.signUp(dto);
      return user_token;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Post('login')
  @ApiOperation(login.operation)
  @ApiBody(login.body)
  async login(@Body() dto: LoginDto): Promise<FirebaseToken> {
    try {
      const user_token = await this.auth_service.login(dto);
      return user_token;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
