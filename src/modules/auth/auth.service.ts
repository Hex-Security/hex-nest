import {
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FirebaseToken } from 'src/shared/dto/firebase/token.dto';
import { UserToken } from 'src/shared/dto/firebase/user-token.dto';
import { RolesEnum } from 'src/shared/enum/roles.enum';
import { User } from '../entity/entities/user.entity';
import { FirebaseService } from '../firebase/firebase.service';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { SignupResponseDto } from './dto/signup-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly user_service: UserService,
    private readonly firebase_service: FirebaseService,
  ) {}

  async signUp(dto: RegisterDto): Promise<SignupResponseDto> {
    try {
      const { email, first_name, last_name, username } = dto;

      // 1. Validate if user already exists
      if (await this.user_service.findByEmail(email)) {
        throw new ConflictException(`User with email ${email} already exists`);
      }

      // 2. Create user in Firebase Auth
      const fb_user: UserToken = await this.firebase_service.signUp(dto);
      console.log(fb_user);

      const { token } = fb_user;

      // 3. Create user on our DB
      const user: User = await this.user_service.create({
        user_id: fb_user.user.uid,
        email,
        name: first_name,
        lname: last_name,
        role: RolesEnum.USER,
        username,
      });

      return { user, token };
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status || 500);
    }
  }

  async login(dto: LoginDto): Promise<FirebaseToken> {
    const { email, password } = dto;

    const user = await this.user_service.findByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.firebase_service.login(email, password);
  }
}
