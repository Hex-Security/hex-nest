import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { House } from './house.schema';
import { Vehicle } from './vehicle.schema';
import { Complex } from './complex.schema';

export type UserDataDocument = HydratedDocument<UserData>;

export type ResidentDataDocument = HydratedDocument<ResidentData>;
export type GuardDataDocument = HydratedDocument<GuardData>;
export type AdminDataDocument = HydratedDocument<AdminData>;

export type GuardScheduleDocument = HydratedDocument<GuardSchedule>;

@Schema({ _id: false })
export class ResidentData {
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'House' }] })
  houses: House[];
}

@Schema({ _id: false })
export class GuardData {
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'House' }] })
  complexes: Complex[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' }] })
  schedule: GuardSchedule[];
}

@Schema({ _id: false })
export class AdminData {
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'House' }] })
  complexes: Complex[];
}

@Schema({ _id: false })
export class GuardSchedule {
  @Prop({ type: Date })
  date: Date;

  @Prop({ type: Date })
  start: Date;

  @Prop({ type: Date })
  end: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Complex' })
  complex: Complex;

  @Prop({ type: String, ref: 'Complex.access_points.name' })
  access_point: string;
}

export const ResidentDataSchema = SchemaFactory.createForClass(ResidentData);
export const GuardDataSchema = SchemaFactory.createForClass(GuardData);
export const AdminDataSchema = SchemaFactory.createForClass(AdminData);
export const GuardScheduleSchema = SchemaFactory.createForClass(GuardSchedule);

@Schema({ _id: false })
export class UserData {
  @Prop({ type: ResidentDataSchema })
  user?: ResidentData;

  @Prop({ type: GuardDataSchema })
  guard?: GuardData;

  @Prop({ type: AdminDataSchema })
  admin?: AdminData;
}

export const UserDataSchema = SchemaFactory.createForClass(UserData);
