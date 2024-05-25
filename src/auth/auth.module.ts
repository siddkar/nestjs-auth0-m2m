import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TokenAuthGuard } from './guards/token-auth/token-auth.guard';
import { PermissionsGuard } from './guards/permission/permissions.guard';
import { TokenAuthService } from './guards/token-auth/token-auth.service';

@Module({
    providers: [
        {
            provide: APP_GUARD,
            useClass: TokenAuthGuard,
        },
        {
            provide: APP_GUARD,
            useClass: PermissionsGuard,
        },
        TokenAuthService,
    ],
    exports: [TokenAuthService],
})
export class AuthModule {}
