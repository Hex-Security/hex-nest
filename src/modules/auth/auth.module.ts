import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entity/entities/user.entity';
import { FirebaseClientService } from '../firebase/firebase-client.service';
import { FirebaseModule } from '../firebase/firebase.module';
import { FirebaseService } from '../firebase/firebase.service';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), FirebaseModule],
  providers: [AuthService, UserService, FirebaseService, FirebaseClientService],
  controllers: [AuthController],
})
export class AuthModule {}
