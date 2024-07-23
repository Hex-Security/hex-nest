import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Complex } from './complex.schema';
import { User } from './user.schema';
import { Vehicle } from './vehicle.schema';
import { Visitor } from './visitor.schema';

export type HouseDocument = HydratedDocument<House>;

@Schema({ timestamps: true })
export class House {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  _id: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Complex' })
  complex: Complex;

  @Prop({ required: true })
  number: string;

  @Prop({ required: true })
  address: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner: User;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  residents: User[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' }] })
  vehicles: Vehicle[];

  @Prop({
    default: [],
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Visitor' }],
  })
  visitors: Visitor[];

  @Prop()
  bedrooms: number;

  @Prop()
  bathrooms: number;

  @Prop()
  square_m: number;

  @Prop({ default: true })
  active: boolean;
}

export const HouseSchema = SchemaFactory.createForClass(House);
