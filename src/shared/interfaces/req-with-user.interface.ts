import { UserDocument } from 'src/schemas/user.schema';

export interface ReqWithUser extends Request {
  user: UserDocument;
}
