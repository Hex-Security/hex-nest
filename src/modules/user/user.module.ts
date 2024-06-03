import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entity/entities/user.entity';
import { FirebaseClientService } from '../firebase/firebase-client.service';
import { FirebaseService } from '../firebase/firebase.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, FirebaseService, FirebaseClientService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
