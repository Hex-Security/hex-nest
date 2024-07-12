import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';

export type AccessPointDocument = HydratedDocument<AccessPoint>;

@Schema({ timestamps: true })
export class AccessPoint {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  location: string;

  @Prop({ default: true })
  active: boolean;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  current_guard: User;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  guards: User[];
}

export const AccessPointSchema = SchemaFactory.createForClass(AccessPoint);
