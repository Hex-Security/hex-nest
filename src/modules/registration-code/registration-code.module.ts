import { Module } from '@nestjs/common';
import { RegistrationCodeService } from './registration-code.service';
import { RegistrationCodeController } from './registration-code.controller';
import { EntityModule } from '../entity/entity.module';
import { FirebaseService } from '../firebase/firebase.service';
import { FirebaseClientService } from '../firebase/firebase-client.service';
import { FirebaseModule } from '../firebase/firebase.module';

@Module({
  imports: [EntityModule, FirebaseModule],
  providers: [RegistrationCodeService, FirebaseService, FirebaseClientService],
  controllers: [RegistrationCodeController],
  exports: [RegistrationCodeService],
})
export class RegistrationCodeModule {}
