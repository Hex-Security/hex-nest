import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Access } from '../entity/entities/access.entity';
import { House } from '../entity/entities/house.entity';
import { User } from '../entity/entities/user.entity';
import { Vehicle } from '../entity/entities/vehicle.entity';
import { Visitor } from '../entity/entities/visitor.entity';
import { HouseModule } from '../house/house.module';
import { HouseService } from '../house/house.service';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { VehicleModule } from '../vehicle/vehicle.module';
import { VehicleService } from '../vehicle/vehicle.service';
import { VisitorModule } from '../visitor/visitor.module';
import { VisitorService } from '../visitor/visitor.service';
import { AccessService } from './access.service';
import { AccessController } from './access.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Access, User, Visitor, House, Vehicle]),
    UserModule,
    VisitorModule,
    HouseModule,
    VehicleModule,
  ],
  providers: [
    AccessService,
    UserService,
    VisitorService,
    HouseService,
    VehicleService,
  ],
  exports: [AccessService],
  controllers: [AccessController],
})
export class AccessModule {}
