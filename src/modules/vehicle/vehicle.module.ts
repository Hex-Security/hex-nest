import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComplexModule } from '../complex/complex.module';
import { ComplexService } from '../complex/complex.service';
import { Complex } from '../entity/entities/complex.entity';
import { House } from '../entity/entities/house.entity';
import { User } from '../entity/entities/user.entity';
import { Vehicle } from '../entity/entities/vehicle.entity';
import { Visitor } from '../entity/entities/visitor.entity';
import { HouseModule } from '../house/house.module';
import { HouseService } from '../house/house.service';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { VisitorModule } from '../visitor/visitor.module';
import { VisitorService } from '../visitor/visitor.service';
import { VehicleController } from './vehicle.controller';
import { VehicleService } from './vehicle.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Vehicle, Complex, House, User, Visitor]),
    forwardRef(() => HouseModule),
    VisitorModule,
    UserModule,
    ComplexModule,
  ],
  providers: [
    VehicleService,
    HouseService,
    VisitorService,
    UserService,
    ComplexService,
  ],
  controllers: [VehicleController],
  exports: [VehicleService],
})
export class VehicleModule {}
