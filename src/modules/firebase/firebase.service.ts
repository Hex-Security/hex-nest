import {
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import * as firebaseAdmin from 'firebase-admin';
import { Auth as AdminAuth } from 'firebase-admin/lib/auth/auth';
import * as firebase from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';
import { FirebaseToken } from 'src/shared/dto/firebase/token.dto';
import { UserToken } from 'src/shared/dto/firebase/user-token.dto';
import { RolesEnum } from 'src/shared/enum/roles.enum';
import { RegisterDto } from '../auth/dto/register.dto';
import { FirebaseClientService } from './firebase-client.service';

@Injectable()
export class FirebaseService implements OnModuleInit {
  private admin: AdminAuth;
  private auth: Auth;

  private app: firebase.FirebaseApp;

  onModuleInit() {
    if (firebaseAdmin.apps.length === 0) {
      const serviceAccount = require('../../../hex-nest-firebase-adminsdk-avvkg-df3f7e9235.json');
      firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert(
          serviceAccount as firebaseAdmin.ServiceAccount,
        ),
      });

      this.app = firebase.initializeApp({
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
      });

      this.admin = firebaseAdmin.auth();
      this.auth = getAuth(this.app);
    }
  }

  constructor(private readonly firebase_client: FirebaseClientService) {}

  async verifyToken(
    idToken: string,
  ): Promise<firebaseAdmin.auth.DecodedIdToken> {
    try {
      return await this.admin.verifyIdToken(idToken);
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async login(email: string, password: string): Promise<FirebaseToken> {
    try {
      const token = await this.firebase_client.login(email, password);
      return token;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  async signUp(dto: RegisterDto): Promise<UserToken> {
    try {
      const { email, password, first_name, last_name, username } = dto;

      const user = await this.admin.createUser({
        email,
        password,
        displayName: username || `${first_name} ${last_name}`,
      });

      await this.admin.setCustomUserClaims(user.uid, { role: RolesEnum.USER });

      const token = await this.admin.createCustomToken(user.uid);

      return {
        user,
        token,
      };
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
