import { BadRequestException, Injectable } from '@nestjs/common';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import * as admin from 'firebase-admin';
import { CreateRequest } from 'firebase-admin/lib/auth/auth-config';
import { UserRecord } from 'firebase-admin/lib/auth/user-record';

@Injectable()
export class FirebaseService {
  async verifyIdToken(id_token: string): Promise<DecodedIdToken> {
    try {
      const decodedToken = await admin.auth().verifyIdToken(id_token);
      return decodedToken;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getUser(uid: string): Promise<admin.auth.UserRecord> {
    try {
      const user: UserRecord = await admin.auth().getUser(uid);
      return user;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async createUser(user: CreateRequest): Promise<UserRecord> {
    try {
      const created_user: UserRecord = await admin.auth().createUser(user);
      return created_user;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async updateUser(uid: string, user: CreateRequest): Promise<UserRecord> {
    try {
      const updated_user: UserRecord = await admin.auth().updateUser(uid, user);
      return updated_user;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
