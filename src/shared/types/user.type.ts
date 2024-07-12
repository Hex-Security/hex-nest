import { Document } from 'mongoose';
import { UserInterface } from '../interfaces/user.interface';

export type UserDocument = UserInterface & Document;
