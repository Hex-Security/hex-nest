import { UserRecord } from 'firebase-admin/lib/auth/user-record';

export class UserToken {
  user: UserRecord;
  token: string;
}
