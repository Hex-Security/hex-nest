import mongoose from 'mongoose';
import { VisitorStatus } from '../enum/visitor.enum';

export interface VisitorInterface {
  complex_id: mongoose.Schema.Types.ObjectId;
  host_id: mongoose.Schema.Types.ObjectId;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  id_number: string;
  vehicle_id: mongoose.Schema.Types.ObjectId;
  requested_by: mongoose.Schema.Types.ObjectId;
  approved_by: mongoose.Schema.Types.ObjectId;
  expected_arrival: Date;
  expected_departure: Date;
  actual_arrival: Date;
  actual_departure: Date;
  status: VisitorStatus;
}
