import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Access } from './entities/access.entity';
import { Complex } from './entities/complex.entity';
import { House } from './entities/house.entity';
import { User } from './entities/user.entity';
import { Vehicle } from './entities/vehicle.entity';
import { Visitor } from './entities/visitor.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Access, Complex, House, User, Vehicle, Visitor]),
  ],
  exports: [TypeOrmModule],
})
export class EntityModule {}
