import { Document } from 'mongoose';
import { HouseInterface } from '../interfaces/house.interface';

export type HouseDocument = HouseInterface & Document;
