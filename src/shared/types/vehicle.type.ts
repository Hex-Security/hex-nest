import { Document } from 'mongoose';
import { VehicleInterface } from '../interfaces/vehicle.interface';

export type VehicleDocument = VehicleInterface & Document;
