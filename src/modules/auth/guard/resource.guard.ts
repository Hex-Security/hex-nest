import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserDocument } from 'src/schemas/user.schema';
import { RolesEnum } from 'src/shared/enum/roles.enum';

@Injectable()
export class ResourceAccessGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const user = req.user as UserDocument;
    const { user_id, complex_id, house_id, vehicle_id } = req.params;

    if (!user) {
      throw new UnauthorizedException('Unauthorized access');
    }

    // Dev can access all resources
    if (user.role === RolesEnum.DEV) {
      return true;
    }

    // Validations:
    // 1. User can only access their own resources
    //    If _id is provided, the user is trying to access a specific resource
    //    If _id is not provided, the user is trying to access its own resources
    if (
      user.role === RolesEnum.USER &&
      ((user_id !== undefined && user._id.toString() === user_id) ||
        (user_id === undefined &&
          complex_id === undefined &&
          house_id === undefined))
    ) {
      return true;
    }

    // 2. Admin can access all resources from its managed complexes
    //    If complex_id is not provided, the user is trying to access its own complexes
    //    If complex_id is provided, the user is trying to access a specific complex
    if (
      user.role === RolesEnum.ADMIN &&
      ((complex_id !== undefined &&
        user.data.admin.complexes
          .map((c) => c._id.toString())
          .includes(complex_id)) ||
        complex_id === undefined)
    ) {
      return true;
    }

    // 3. Guards can access all resources from its managed complexes
    //    If complex_id is not provided, the user is trying to access its own complexes
    //    If complex_id is provided, the user is trying to access a specific complex
    if (
      user.role === RolesEnum.GUARD &&
      ((complex_id !== undefined &&
        user.data.guard.complexes
          .map((c) => c._id.toString())
          .includes(complex_id)) ||
        complex_id === undefined)
    ) {
      return true;
    }

    // 4. If the user is trying to access a specific vehicle, the user must
    //    be the owner or be an admin/guard with access to the vehicle's complex
    if (
      vehicle_id !== undefined && // If the user is trying to access a specific vehicle
      ((user.role === RolesEnum.USER && // If the user is a resident
        user.vehicles.map((v) => v._id.toString()).includes(vehicle_id)) || // The user is the owner
        (user.role === RolesEnum.ADMIN && // If the user is an admin
          user.data.admin.complexes // The user has access to the complex's vehicles
            .map((c) => c.vehicles.map((v) => v._id.toString()).flat())
            .flat()
            .includes(vehicle_id)) ||
        (user.role === RolesEnum.GUARD && // If the user is a guard
          user.data.guard.complexes // The user has access to the complex's vehicles
            .map((c) => c.vehicles.map((v) => v._id.toString()).flat())
            .flat()
            .includes(vehicle_id)))
    ) {
      return true;
    }

    throw new UnauthorizedException("You cannot access other user's data");
  }
}
