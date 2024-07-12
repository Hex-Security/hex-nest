import { Document } from 'mongoose';
import { VisitorInterface } from '../interfaces/visitor.interface';

export type VisitorDocument = VisitorInterface & Document;
