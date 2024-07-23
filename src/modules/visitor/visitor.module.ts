import { Module } from '@nestjs/common';
import { VisitorService } from './visitor.service';
import { EntityModule } from '../entity/entity.module';
import { VisitorController } from './visitor.controller';
import { UserService } from '../user/user.service';
import { ComplexService } from '../complex/complex.service';
import { VehicleService } from '../vehicle/vehicle.service';
import { HouseService } from '../house/house.service';
import { FirebaseService } from '../firebase/firebase.service';
import { FirebaseClientService } from '../firebase/firebase-client.service';

@Module({
  imports: [EntityModule],
  providers: [
    VisitorService,
    UserService,
    ComplexService,
    VehicleService,
    HouseService,
    FirebaseService,
    FirebaseClientService,
  ],
  exports: [VisitorService],
  controllers: [VisitorController],
})
export class VisitorModule {}
