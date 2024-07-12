import mongoose from 'mongoose';

export interface HouseInterface {
  complex_id: mongoose.Schema.Types.ObjectId;
  number: string;
  address: string;
  owner_id: mongoose.Schema.Types.ObjectId;
  resident_ids: mongoose.Schema.Types.ObjectId[];
  vehicle_ids: mongoose.Schema.Types.ObjectId[];
  bedrooms: number;
  bathrooms: number;
  square_m: number;
  active: boolean;
}
