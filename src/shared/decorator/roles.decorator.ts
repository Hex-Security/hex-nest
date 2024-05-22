// src/auth/roles.decorator.ts
import { SetMetadata } from '@nestjs/common';
import { RolesEnum } from '../enum/roles.enum';

export const ROLES_KEY = 'roles';
/**
 * Decorator that sets the roles metadata for a given endpoint.
 * @param roles The roles to be assigned to the endpoint.
 * @returns A metadata decorator function.
 */
export const Roles = (...roles: RolesEnum[]) => SetMetadata(ROLES_KEY, roles);
