import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FirebaseToken } from 'src/shared/dto/firebase/token.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignupResponseDto } from './dto/signup-response.dto';
import { login } from './swagger/login.swagger';
import { signup_user } from './swagger/signup-user.swagger';
import { RegisterGuardDto } from 'src/shared/dto/auth/register-guard.dto';
import { RegisterDto } from 'src/shared/dto/auth/register-base.dto';
import { RegisterAdminDto } from 'src/shared/dto/auth/register-admin.dto';
import { signup_guard } from './swagger/signup-guard.swagger';
import { signup_admin } from './swagger/signup-admin.swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly auth_service: AuthService) {}

  @Post('sign-up/user')
  @ApiOperation(signup_user.operation)
  @ApiBody(signup_user.body)
  @ApiResponse(signup_user.ok_response)
  async register(@Body() dto: RegisterDto): Promise<SignupResponseDto> {
    try {
      const user_token = await this.auth_service.signUpUser(dto);
      return user_token;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Post('sign-up/guard')
  @ApiOperation(signup_guard.operation)
  @ApiBody(signup_guard.body)
  @ApiResponse(signup_guard.ok_response)
  async registerGuard(
    @Body() dto: RegisterGuardDto,
  ): Promise<SignupResponseDto> {
    try {
      const user_token = await this.auth_service.signUpGuard(dto);
      return user_token;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Post('sign-up/admin')
  @ApiOperation(signup_admin.operation)
  @ApiBody(signup_admin.body)
  @ApiResponse(signup_admin.ok_response)
  async registerAdmin(
    @Body() dto: RegisterAdminDto,
  ): Promise<SignupResponseDto> {
    try {
      const user_token = await this.auth_service.signUpAdmin(dto);
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
