import { User } from 'src/modules/entity/entities/user.entity';
import { FirebaseToken } from 'src/shared/dto/firebase/token.dto';

export class SignupResponseDto {
  user: User;
  token: FirebaseToken;
}
