import { forwardRef, Module } from '@nestjs/common';
import { ComplexController } from './complex.controller';
import { ComplexService } from './complex.service';
import { EntityModule } from '../entity/entity.module';
import { FirebaseModule } from '../firebase/firebase.module';
import { FirebaseService } from '../firebase/firebase.service';
import { FirebaseClientService } from '../firebase/firebase-client.service';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { HouseService } from '../house/house.service';
@Module({
  imports: [EntityModule, forwardRef(() => UserModule), FirebaseModule],
  controllers: [ComplexController],
  providers: [
    ComplexService,
    UserService,
    FirebaseService,
    FirebaseClientService,
    HouseService,
  ],
  exports: [ComplexService],
})
export class ComplexModule {}
