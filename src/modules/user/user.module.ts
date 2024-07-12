import { Module } from '@nestjs/common';
import { EntityModule } from '../entity/entity.module';
import { FirebaseClientService } from '../firebase/firebase-client.service';
import { FirebaseService } from '../firebase/firebase.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [EntityModule],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
