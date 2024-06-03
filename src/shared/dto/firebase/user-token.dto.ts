import { UserRecord } from 'firebase-admin/lib/auth/user-record';
import { FirebaseToken } from './token.dto';

export class UserToken {
  user: UserRecord;
  token: FirebaseToken;
}
