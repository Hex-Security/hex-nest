import { Module } from '@nestjs/common';
import { HouseController } from './house.controller';
import { HouseService } from './house.service';
import { EntityModule } from '../entity/entity.module';
import { ComplexService } from '../complex/complex.service';
import { UserService } from '../user/user.service';
import { FirebaseService } from '../firebase/firebase.service';
import { FirebaseClientService } from '../firebase/firebase-client.service';
import { VehicleService } from '../vehicle/vehicle.service';

@Module({
  imports: [EntityModule],
  providers: [
    HouseService,
    ComplexService,
    FirebaseService,
    FirebaseClientService,
    UserService,
    VehicleService,
  ],
  controllers: [HouseController],
  exports: [HouseService],
})
export class HouseModule {}
