import { User } from 'src/modules/entity/entities/user.entity';

export class SignupResponseDto {
  user: User;
  token: string;
}
