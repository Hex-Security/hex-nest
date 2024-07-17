import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { isEmail, isMobilePhone } from 'class-validator';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';
import { AccessPoint, AccessPointSchema } from './access-point.schema';
import { House } from './house.schema';

export type ComplexDocument = HydratedDocument<Complex>;

@Schema({ timestamps: true })
export class Complex {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  _id: mongoose.Types.ObjectId;

  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true, unique: true })
  address: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  zip_code: string;

  @Prop({ required: true, validate: [isMobilePhone, 'Invalid phone number'] })
  contact_number: string;

  @Prop({ required: true, validate: [isEmail, 'Invalid email address'] })
  email: string;

  @Prop({ default: true })
  active: boolean;

  @Prop({
    required: true,
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  })
  admins: User[];

  @Prop({
    required: true,
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  })
  guards: User[];

  @Prop({
    required: true,
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  })
  residents: User[];

  @Prop({
    required: true,
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'House' }],
  })
  houses: House[];

  @Prop({ type: [AccessPointSchema] })
  access_points: AccessPoint[];
}

export const ComplexSchema = SchemaFactory.createForClass(Complex);
