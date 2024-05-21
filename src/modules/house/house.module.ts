import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComplexModule } from '../complex/complex.module';
import { ComplexService } from '../complex/complex.service';
import { DbModule } from '../db/db.module';
import { Complex } from '../entity/entities/complex.entity';
import { House } from '../entity/entities/house.entity';
import { User } from '../entity/entities/user.entity';
import { Vehicle } from '../entity/entities/vehicle.entity';
import { Visitor } from '../entity/entities/visitor.entity';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { VehicleModule } from '../vehicle/vehicle.module';
import { VehicleService } from '../vehicle/vehicle.service';
import { VisitorModule } from '../visitor/visitor.module';
import { VisitorService } from '../visitor/visitor.service';
import { HouseController } from './house.controller';
import { HouseService } from './house.service';

@Module({
  imports: [
    DbModule,
    TypeOrmModule.forFeature([House, User, Complex, Visitor, Vehicle]),
    UserModule,
    VisitorModule,
    ComplexModule,
    forwardRef(() => VehicleModule),
  ],
  providers: [
    HouseService,
    VisitorService,
    UserService,
    ComplexService,
    VehicleService,
  ],
  controllers: [HouseController],
  exports: [HouseService],
})
export class HouseModule {}
