import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';
import { Complex } from './complex.schema';
import { Visitor } from './visitor.schema';

export type VehicleDocument = HydratedDocument<Vehicle>;

@Schema({ timestamps: true })
export class Vehicle {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  _id: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Visitor' })
  owner_visitor: Visitor;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Complex',
  })
  complex: Complex;

  @Prop({ required: true, unique: true })
  plate: string;

  @Prop({ required: true })
  make: string;

  @Prop({ required: true })
  model: string;

  @Prop()
  year: number;

  @Prop({ required: true })
  color: string;

  @Prop({ default: true })
  active: boolean;
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);
