import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Access, AccessSchema } from 'src/schemas/access.schema';
import { Complex, ComplexSchema } from 'src/schemas/complex.schema';
import { House, HouseSchema } from 'src/schemas/house.schema';
import { User, UserSchema } from 'src/schemas/user.schema';
import { Vehicle, VehicleSchema } from 'src/schemas/vehicle.schema';
import { Visitor, VisitorSchema } from 'src/schemas/visitor.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Access.name, schema: AccessSchema },
      { name: Complex.name, schema: ComplexSchema },
      { name: House.name, schema: HouseSchema },
      { name: User.name, schema: UserSchema },
      { name: Vehicle.name, schema: VehicleSchema },
      { name: Visitor.name, schema: VisitorSchema },
    ]),
  ],
  exports: [MongooseModule],
})
export class EntityModule {}
