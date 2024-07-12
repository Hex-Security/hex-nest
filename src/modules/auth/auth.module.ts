import { Module } from '@nestjs/common';
import { FirebaseClientService } from '../firebase/firebase-client.service';
import { FirebaseModule } from '../firebase/firebase.module';
import { FirebaseService } from '../firebase/firebase.service';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { EntityModule } from '../entity/entity.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [EntityModule, UserModule, FirebaseModule],
  providers: [AuthService, UserService, FirebaseService, FirebaseClientService],
  controllers: [AuthController],
})
export class AuthModule {}
