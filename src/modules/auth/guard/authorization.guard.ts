import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/modules/firebase/firebase.service';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private readonly firebaseService: FirebaseService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split('Bearer ')[1];
    if (!token) {
      return false;
    }
    request.user = await this.firebaseService.verifyToken(token);
    return true;
  }
}
