import {
  BadRequestException,
  Body,
  Controller,
  HttpException,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FirebaseToken } from 'src/shared/dto/firebase/token.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { UserTokenDto } from './dto/signup-response.dto';
import { login } from './swagger/login.swagger';
import { signup_user } from './swagger/signup-user.swagger';
import { RegisterGuardDto } from 'src/shared/dto/auth/register-guard.dto';
import { RegisterUserDto } from 'src/shared/dto/auth/register-user.dto';
import { RegisterAdminDto } from 'src/shared/dto/auth/register-admin.dto';
import { signup_guard } from './swagger/signup-guard.swagger';
import { signup_admin } from './swagger/signup-admin.swagger';
import { signup_dev } from './swagger/signup-dev.swagger';
import { RegisterBaseDto } from 'src/shared/dto/auth/register-base.dto';
import { RolesEnum } from 'src/shared/enum/roles.enum';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly auth_service: AuthService) {}

  @Post('sign-up/user')
  @ApiOperation(signup_user.operation)
  @ApiBody(signup_user.body)
  @ApiResponse(signup_user.ok_response)
  async register(@Body() dto: RegisterUserDto): Promise<UserTokenDto> {
    try {
      const user_token = await this.auth_service.signUp(dto, RolesEnum.USER);
      return user_token;
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  @Post('sign-up/guard')
  @ApiOperation(signup_guard.operation)
  @ApiBody(signup_guard.body)
  @ApiResponse(signup_guard.ok_response)
  async registerGuard(@Body() dto: RegisterGuardDto): Promise<UserTokenDto> {
    try {
      const user_token = await this.auth_service.signUp(dto, RolesEnum.GUARD);
      return user_token;
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  @Post('sign-up/admin')
  @ApiOperation(signup_admin.operation)
  @ApiBody(signup_admin.body)
  @ApiResponse(signup_admin.ok_response)
  async registerAdmin(@Body() dto: RegisterAdminDto): Promise<UserTokenDto> {
    try {
      const user_token = await this.auth_service.signUp(dto, RolesEnum.ADMIN);
      return user_token;
    } catch (error) {
      throw error;
    }
  }

  @Post('sign-up/dev')
  @ApiOperation(signup_dev.operation)
  @ApiBody(signup_dev.body)
  @ApiResponse(signup_dev.ok_response)
  async registerDev(@Body() dto: RegisterBaseDto): Promise<UserTokenDto> {
    try {
      const user_token = await this.auth_service.signUp(dto, RolesEnum.DEV);
      return user_token;
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  @Post('login')
  @ApiOperation(login.operation)
  @ApiBody(login.body)
  @ApiResponse(login.ok_response)
  async login(@Body() dto: LoginDto): Promise<UserTokenDto> {
    try {
      const user_token = await this.auth_service.login(dto);
      return user_token;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
