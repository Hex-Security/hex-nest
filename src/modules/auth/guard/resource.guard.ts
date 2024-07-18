import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import { UserDocument } from 'src/schemas/user.schema';
import { RolesEnum } from 'src/shared/enum/roles.enum';

@Injectable()
export class ResourceAccessGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const user = req.user as UserDocument;
    const { _id, _cid } = req.params;

    if (!user) {
      throw new UnauthorizedException('Unauthorized access');
    }

    // Dev can access all resources
    if (user.role === 'dev') {
      return true;
    }

    // Validations:
    // 1. User can only access their own resources
    if (user.role === RolesEnum.USER && _id !== undefined && user._id === _id) {
      return true;
    }

    // 2. Admin can access all resources from its managed complexes
    if (
      user.role === RolesEnum.ADMIN &&
      user.data.admin.complexes.includes(_cid)
    ) {
      return true;
    }

    // 3. Guards can access all resources from its managed complexes
    if (
      user.role === RolesEnum.GUARD &&
      user.data.guard.complexes.includes(_cid)
    ) {
      return true;
    }

    throw new UnauthorizedException("You cannot access other user's data");
  }
}
