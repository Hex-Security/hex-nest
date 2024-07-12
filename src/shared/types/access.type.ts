import { Document } from 'mongoose';
import { AccessInterface } from '../interfaces/access.interface';

export type AccessDocument = AccessInterface & Document;
