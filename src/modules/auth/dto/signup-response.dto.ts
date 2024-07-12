import { UserDocument } from 'src/schemas/user.schema';
import { FirebaseToken } from 'src/shared/dto/firebase/token.dto';

export class SignupResponseDto {
  user: UserDocument;
  token: FirebaseToken;
}
