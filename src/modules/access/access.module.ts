import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComplexModule } from '../complex/complex.module';
import { ComplexService } from '../complex/complex.service';
import { Access } from '../entity/entities/access.entity';
import { Complex } from '../entity/entities/complex.entity';
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
import { AccessController } from './access.controller';
import { AccessService } from './access.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Access, Complex, User, Visitor, House, Vehicle]),
    UserModule,
    VisitorModule,
    HouseModule,
    ComplexModule,
    VehicleModule,
  ],
  providers: [
    AccessService,
    HouseService,
    UserService,
    VisitorService,
    VehicleService,
    ComplexService,
  ],
  exports: [AccessService],
  controllers: [AccessController],
})
export class AccessModule {}
