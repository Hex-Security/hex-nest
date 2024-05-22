import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/modules/entity/entities/user.entity';
import { TokenPayload } from '../dto/token.dto';

@Injectable()
export class ResourceAccessGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const user: User = req.user as User; // Assuming user object is attached by AuthGuard
    const { user_id } = req.params;
    const auth = req.authInfo as TokenPayload;

    if (!user || !auth) {
      throw new UnauthorizedException('Unauthorized access');
    }

    if (user_id) {
      return user_id === user.user_id;
    }

    throw new UnauthorizedException("You cannot access other user's data");
  }
}
