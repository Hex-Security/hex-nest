import { Module } from '@nestjs/common';
import { FirebaseClientService } from '../firebase/firebase-client.service';
import { FirebaseModule } from '../firebase/firebase.module';
import { FirebaseService } from '../firebase/firebase.service';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { EntityModule } from '../entity/entity.module';
import { UserModule } from '../user/user.module';
import { RegistrationCodeService } from '../registration-code/registration-code.service';
import { RegistrationCodeModule } from '../registration-code/registration-code.module';
import { ComplexService } from '../complex/complex.service';
import { ComplexModule } from '../complex/complex.module';
import { HouseService } from '../house/house.service';
import { VehicleService } from '../vehicle/vehicle.service';

@Module({
  imports: [
    EntityModule,
    UserModule,
    FirebaseModule,
    RegistrationCodeModule,
    ComplexModule,
  ],
  providers: [
    AuthService,
    UserService,
    FirebaseService,
    FirebaseClientService,
    RegistrationCodeService,
    ComplexService,
    HouseService,
    VehicleService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
