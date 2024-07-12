import {
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FirebaseToken } from 'src/shared/dto/firebase/token.dto';
import { UserToken } from 'src/shared/dto/firebase/user-token.dto';
import { RolesEnum } from 'src/shared/enum/roles.enum';
import { FirebaseService } from '../firebase/firebase.service';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { SignupResponseDto } from './dto/signup-response.dto';
import { UserDocument } from 'src/schemas/user.schema';
import mongoose from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    private readonly user_service: UserService,
    private readonly firebase_service: FirebaseService,
  ) {}

  async signUp(dto: RegisterDto): Promise<SignupResponseDto> {
    let stage = 0;

    try {
      const { email, first_name, last_name, username, dob } = dto;

      // 1. Validate if user already exists
      if (await this.user_service.existsEmail(email)) {
        throw new ConflictException(`User with email ${email} already exists`);
      }

      // 2. Create custom ObjectId
      const _id = new mongoose.Types.ObjectId().toString();

      // 3. Create user in Firebase Auth
      const fb_user: UserToken = await this.firebase_service.signUp(dto, _id);

      stage++;

      const { token } = fb_user;

      // 4. Create user on our DB
      const user: UserDocument = await this.user_service.create({
        _id,
        uid: fb_user.user.uid,
        email,
        username,
        first_name,
        last_name,
        role: RolesEnum.USER,
        birth_date: dob,
      });

      stage++;

      return { user, token };
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status || 500);
    } finally {
      if (stage < 2) {
        // Rollback
        console.log('Rollback');

        // Delete user from Firebase Auth
        await this.firebase_service.deleteUser(dto.email);

        console.log(`User with email ${dto.email} deleted from Firebase Auth`);
      }
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
