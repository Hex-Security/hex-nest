import mongoose from 'mongoose';

export interface VehicleInterface {
  owner_id: mongoose.Schema.Types.ObjectId;
  plate: string;
  v_model: string;
  make: string;
  year: number;
  color: string;
  active: boolean;
}
