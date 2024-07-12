import { Document } from 'mongoose';
import { ComplexInterface } from '../interfaces/complex.interface';

export type ComplexDocument = ComplexInterface & Document;
