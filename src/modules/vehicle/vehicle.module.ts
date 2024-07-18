import { Module } from '@nestjs/common';
import { VehicleController } from './vehicle.controller';
import { VehicleService } from './vehicle.service';
import { EntityModule } from '../entity/entity.module';
import { UserService } from '../user/user.service';
import { ComplexService } from '../complex/complex.service';
import { HouseService } from '../house/house.service';
import { FirebaseService } from '../firebase/firebase.service';
import { FirebaseClientService } from '../firebase/firebase-client.service';

@Module({
  imports: [EntityModule],
  providers: [
    VehicleService,
    UserService,
    FirebaseService,
    FirebaseClientService,
    ComplexService,
    HouseService,
  ],
  controllers: [VehicleController],
  exports: [VehicleService],
})
export class VehicleModule {}
