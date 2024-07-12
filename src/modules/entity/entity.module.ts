import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Access } from './entities/access.entity';
import { Complex } from './entities/complex.entity';
import { House } from './entities/house.entity';
import { User } from './entities/user.entity';
import { Vehicle } from './entities/vehicle.entity';
import { Visitor } from './entities/visitor.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Access', schema: Access },
      { name: 'Complex', schema: Complex },
      { name: 'House', schema: House },
      { name: 'User', schema: User },
      { name: 'Vehicle', schema: Vehicle },
      { name: 'Visitor', schema: Visitor },
    ]),
  ],
  exports: [MongooseModule],
})
export class EntityModule {}
