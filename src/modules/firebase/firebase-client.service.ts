import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { FirebaseToken } from 'src/shared/dto/firebase/token.dto';

@Injectable()
export class FirebaseClientService {
  client: AxiosInstance;
  constructor() {
    if (!this.client) {
      this.client = axios.create({
        baseURL: 'https://identitytoolkit.googleapis.com',
      });
    }
  }

  getClient() {
    return this.client;
  }

  async login(email: string, password: string): Promise<FirebaseToken> {
    const response = await this.client.post<FirebaseToken>(
      `/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`,
      {
        email,
        password,
        returnSecureToken: true,
      },
    );

    return response.data;
  }
}
