import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { FirebaseService } from 'src/modules/firebase/firebase.service';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    private readonly firebase_service: FirebaseService,
    private readonly user_service: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const token = request.headers.authorization?.split('Bearer ')[1];

      if (!token) {
        return false;
      }

      const fb_user = await this.firebase_service.verifyToken(token);

      if (!fb_user) {
        throw new UnauthorizedException(
          'Unauthorized access. Invalid token data.',
        );
      }

      const user = await this.user_service.findByUid(fb_user.uid);

      request.user = user;
      return true;
    } catch (error) {
      console.log('Error in authorization:', error);
      throw new UnauthorizedException('Unauthorized access. ' + error.message);
    }
  }
}
