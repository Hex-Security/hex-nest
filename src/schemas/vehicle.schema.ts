import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';

export type VehicleDocument = HydratedDocument<Vehicle>;

@Schema({ timestamps: true })
export class Vehicle {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner: User;

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