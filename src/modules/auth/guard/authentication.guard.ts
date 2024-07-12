import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { FirebaseService } from 'src/modules/firebase/firebase.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private readonly firebase_service: FirebaseService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const token = request.headers.authorization?.split('Bearer ')[1];

      if (!token) {
        return false;
      }

      const user = await this.firebase_service.verifyToken(token);

      if (!user) {
        throw new UnauthorizedException(
          'Unauthorized access. Invalid token data.',
        );
      }

      request.user = user;
      return true;
    } catch (error) {
      console.log('Error in authorization:', error);
      throw new UnauthorizedException('Unauthorized access. ' + error.message);
    }
  }
}
