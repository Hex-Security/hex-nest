import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

@Injectable()
export class ResourceAccessGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const user = req.user as DecodedIdToken; // Assuming user object is attached by AuthGuard
    const { user_id } = req.params;

    if (!user) {
      throw new UnauthorizedException('Unauthorized access');
    }

    if (user_id && user.uid === user_id) {
      return true;
    }

    throw new UnauthorizedException("You cannot access other user's data");
  }
}
