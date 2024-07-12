import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { isMobilePhone } from 'class-validator';
import mongoose, { HydratedDocument } from 'mongoose';
import { RolesEnum } from 'src/shared/enum/roles.enum';
import { Vehicle } from './vehicle.schema';
import { UserData, UserDataSchema } from './user-data.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  _id: mongoose.Types.ObjectId;

  @Prop({ required: true, unique: true })
  uid: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ unique: true })
  username: string;

  @Prop({ required: true })
  first_name: string;

  @Prop({ required: true })
  last_name: string;

  @Prop()
  birth_date: Date;

  @Prop({ required: true, default: RolesEnum.USER })
  role: RolesEnum;

  @Prop({ validate: [isMobilePhone, 'Invalid phone number'] })
  phone: string;

  @Prop({ default: true })
  active: boolean;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' }] })
  vehicles: Vehicle[];

  @Prop({ type: UserDataSchema })
  data: UserData;
}

export const UserSchema = SchemaFactory.createForClass(User);
