import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Access, AccessSchema } from './entities/access.entity';
import { ComplexSchema } from './entities/complex.entity';
import { HouseSchema } from './entities/house.entity';
import { UserSchema } from './entities/user.entity';
import { VehicleSchema } from './entities/vehicle.entity';
import { VisitorSchema } from './entities/visitor.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Access.modelName, schema: AccessSchema },
      // { name: 'Complex', schema: ComplexSchema },
      // { name: 'House', schema: HouseSchema },
      // { name: 'User', schema: UserSchema },
      // { name: 'Vehicle', schema: VehicleSchema },
      // { name: 'Visitor', schema: VisitorSchema },
    ]),
  ],
  exports: [MongooseModule],
})
export class EntityModule {}
