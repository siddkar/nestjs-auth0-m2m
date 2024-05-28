import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from 'src/auth/decorators/permissions/permissions.decorator';
import { IS_PUBLIC_KEY } from 'src/auth/decorators/public/public.decorator';
import { Permission } from 'src/utils/enums/permissions.enum';

@Injectable()
export class PermissionsGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (isPublic) {
            return true;
        }

        const requiredPermissions = this.reflector.getAllAndOverride<Permission[]>(PERMISSIONS_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requiredPermissions) {
            return true;
        }

        const { client } = context.switchToHttp().getRequest();
        const hasPermission = requiredPermissions.some((permission) => client.permissions?.includes(permission));

        if (!hasPermission) {
            throw new ForbiddenException();
        }

        return hasPermission;
    }
}
