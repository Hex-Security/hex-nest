import { FirebaseToken } from 'src/shared/dto/firebase/token.dto';
import { UserDocument } from 'src/shared/types/user.type';

export class SignupResponseDto {
  user: UserDocument;
  token: FirebaseToken;
}
