import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';
import { Complex } from './complex.schema';
import { House } from './house.schema';
import { RolesEnum } from 'src/shared/enum/roles.enum';

export type RegistrationCodeDocument = HydratedDocument<RegistrationCode>;

@Schema({ timestamps: true })
export class RegistrationCode {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  _id: mongoose.Types.ObjectId;

  @Prop({ required: true })
  code: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true, enum: RolesEnum })
  role: RolesEnum;

  @Prop({ default: true })
  active: boolean;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  emitter: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  account: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Complex' })
  complex: Complex;

  @Prop()
  hash: string;
}

export const RegistrationCodeSchema =
  SchemaFactory.createForClass(RegistrationCode);
