import { forwardRef, Module } from '@nestjs/common';
import { EntityModule } from '../entity/entity.module';
import { FirebaseClientService } from '../firebase/firebase-client.service';
import { FirebaseService } from '../firebase/firebase.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { FirebaseModule } from '../firebase/firebase.module';
import { ComplexService } from '../complex/complex.service';
import { ComplexModule } from '../complex/complex.module';
import { HouseService } from '../house/house.service';
import { VehicleService } from '../vehicle/vehicle.service';
import { VisitorService } from '../visitor/visitor.service';

@Module({
  imports: [EntityModule, FirebaseModule, forwardRef(() => ComplexModule)],
  providers: [
    UserService,
    FirebaseService,
    FirebaseClientService,
    ComplexService,
    HouseService,
    VehicleService,
    VisitorService,
  ],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
