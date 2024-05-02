import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EntityModule } from './modules/entity/entity.module';
import { ComplexModule } from './modules/complex/complex.module';
import { DbModule } from './modules/db/db.module';
import { UserModule } from './modules/user/user.module';
import { HouseModule } from './modules/house/house.module';
import { VehicleService } from './modules/vehicle/vehicle.service';
import { VehicleModule } from './modules/vehicle/vehicle.module';
import { VisitorModule } from './modules/visitor/visitor.module';
import { AccessModule } from './modules/access/access.module';
import { AuthModule } from './modules/auth/auth.module';
import { FirebaseModule } from './modules/firebase/firebase.module';

@Module({
  imports: [EntityModule, ComplexModule, DbModule, UserModule, HouseModule, VehicleModule, VisitorModule, AccessModule, AuthModule, FirebaseModule],
  controllers: [AppController],
  providers: [AppService, VehicleService],
})
export class AppModule {}
