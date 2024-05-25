import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from 'src/auth/decorators/public/public.decorator';
import { TokenAuthService } from './token-auth.service';
import { TokenPayload } from 'src/types/auth/token-payload.type';

@Injectable()
export class TokenAuthGuard implements CanActivate {
    private readonly logger = new Logger(TokenAuthGuard.name);

    constructor(
        private readonly reflector: Reflector,
        private readonly tokenAuthService: TokenAuthService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (isPublic) {
            return true;
        }

        const request: Request = context.switchToHttp().getRequest();
        const token: string | undefined = this.extractTokenFromHeader(request);

        if (!token) {
            throw new UnauthorizedException();
        }

        try {
            const payload: TokenPayload = this.tokenAuthService.verifyToken(token);
            request['client'] = payload;

            return true;
        } catch (err) {
            this.logger.error(err);
            throw new UnauthorizedException();
        }
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
