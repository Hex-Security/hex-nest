import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Visitor } from './visitor.schema';
import { House } from './house.schema';
import { Complex } from './complex.schema';
import { Vehicle } from './vehicle.schema';
import { User } from './user.schema';
import { AccessStatus } from 'src/shared/enum/access.enum';

export type AccessDocument = HydratedDocument<Access>;

@Schema({ timestamps: true })
export class Access {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  _id: mongoose.Types.ObjectId;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  visitor: Visitor;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'House' })
  house: House;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Complex',
  })
  complex: Complex;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' })
  vehicle: Vehicle;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  requested_by: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  approved_by: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  assigned_guard: User;

  @Prop({ required: true })
  expected_arrival: Date;

  @Prop()
  expected_departure: Date;

  @Prop()
  actual_arrival: Date;

  @Prop()
  actual_departure: Date;

  @Prop({ default: AccessStatus.PENDING })
  status: AccessStatus;
}

export const AccessSchema = SchemaFactory.createForClass(Access);
