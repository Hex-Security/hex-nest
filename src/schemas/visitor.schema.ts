import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Complex } from './complex.schema';
import mongoose, { HydratedDocument } from 'mongoose';
import { isEmail, isMobilePhone } from 'class-validator';
import { Vehicle } from './vehicle.schema';
import { User } from './user.schema';
import { VisitorStatus } from 'src/shared/enum/visitor.enum';

export type VisitorDocument = HydratedDocument<Visitor>;

@Schema({ timestamps: true })
export class Visitor {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Complex',
  })
  complex: Complex;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  host: User;

  @Prop({ required: true })
  first_name: string;

  @Prop({ required: true })
  last_name: string;

  @Prop({ validate: [isEmail, 'Invalid email'] })
  email: string;

  @Prop({ validate: [isMobilePhone, 'Invalid phone number'] })
  phone: string;

  @Prop()
  id_number: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' })
  vehicle: Vehicle;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  requested_by: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  approved_by: User;

  @Prop({ default: VisitorStatus.PENDING })
  status: VisitorStatus;
}

export const VisitorSchema = SchemaFactory.createForClass(Visitor);
