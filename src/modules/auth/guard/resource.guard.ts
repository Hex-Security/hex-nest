import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/modules/entity/entities/user.entity';

@Injectable()
export class ResourceAccessGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const user: User = req.user as User; // Assuming user object is attached by AuthGuard
    const { user_id } = req.params;

    if (!user) {
      throw new UnauthorizedException('Unauthorized access');
    }

    if (user_id && user.user_id === user_id) {
      return true;
    }

    throw new UnauthorizedException("You cannot access other user's data");
  }
}
