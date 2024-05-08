import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserService } from '../user/user.service';
import { FirebaseService } from '../firebase/firebase.service';
import { LoginDto } from './dto/login.dto';
import { User } from '../entity/entities/user.entity';
import { TokenDto } from './dto/token.dto';
import { UserRecord } from 'firebase-admin/lib/auth/user-record';

@Injectable()
export class AuthService {
  constructor(
    private readonly user_service: UserService,
    private readonly firebase_service: FirebaseService,
  ) {}

  async getUserToken(dto: LoginDto): Promise<TokenDto> {
    const user: User = await this.user_service.findUserByEmail(dto.email);
    return this.firebase_service.createCustomToken(user.uid);
  }

  async register(dto: RegisterDto): Promise<User> {
    const { email, password, first_name, last_name, phone, username } = dto;

    // 1. Create a new user in Firebase
    const fb_user: UserRecord = await this.firebase_service.createUser({
      email,
      password,
      displayName: username || `${first_name} ${last_name}`,
      phoneNumber: phone,
    });

    // 2. Create a new user in the database

    const user: User = await this.user_service.create({
      uid: fb_user.uid,
      email,
      name: first_name,
      lname: last_name,
      phone,
      username,
    });

    return user;
  }
}
