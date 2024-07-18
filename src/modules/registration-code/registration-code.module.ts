import { Module } from '@nestjs/common';
import { RegistrationCodeService } from './registration-code.service';
import { RegistrationCodeController } from './registration-code.controller';
import { EntityModule } from '../entity/entity.module';
import { FirebaseService } from '../firebase/firebase.service';
import { FirebaseClientService } from '../firebase/firebase-client.service';
import { FirebaseModule } from '../firebase/firebase.module';
import { ComplexService } from '../complex/complex.service';
import { UserService } from '../user/user.service';
import { HouseService } from '../house/house.service';
import { VehicleService } from '../vehicle/vehicle.service';

@Module({
  imports: [EntityModule, FirebaseModule],
  providers: [
    RegistrationCodeService,
    FirebaseService,
    FirebaseClientService,
    ComplexService,
    UserService,
    HouseService,
    VehicleService,
  ],
  controllers: [RegistrationCodeController],
  exports: [RegistrationCodeService],
})
export class RegistrationCodeModule {}
