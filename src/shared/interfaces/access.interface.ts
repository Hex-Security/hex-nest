import mongoose from 'mongoose';
import { AccessStatus } from '../enum/access.enum';

export interface AccessInterface {
  visitor_id: mongoose.Schema.Types.ObjectId;
  house_id: mongoose.Schema.Types.ObjectId;
  complex_id: mongoose.Schema.Types.ObjectId;
  vehicle_id?: mongoose.Schema.Types.ObjectId;
  requested_by: mongoose.Schema.Types.ObjectId;
  approved_by?: mongoose.Schema.Types.ObjectId;
  assigned_guard_id?: mongoose.Schema.Types.ObjectId;
  expected_arrival: Date;
  expected_departure?: Date;
  actual_arrival?: Date;
  actual_departure?: Date;
  status: AccessStatus;
  purpose: string;
  notes?: string;
}
