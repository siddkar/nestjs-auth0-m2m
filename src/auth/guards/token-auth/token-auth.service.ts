import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import jwt, { Jwt } from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';
import ms from 'ms';
import { TokenPayload } from 'src/types/auth/token-payload.type';

@Injectable()
export class TokenAuthService {
    constructor(private readonly configService: ConfigService) {}

    async verifyToken(token: string): Promise<TokenPayload | string> {
        const decodedToken: Jwt = jwt.decode(token, { complete: true });

        const client = jwksClient({
            jwksUri: this.configService.get<string>('auth.jwksUri'),
            cache: true,
            cacheMaxAge: ms('1h'),
            rateLimit: true,
            jwksRequestsPerMinute: 10,
            timeout: ms('10s'),
        });

        const key = await client.getSigningKey(decodedToken.header.kid);
        const signingKey: string = key.getPublicKey();

        return jwt.verify(token, signingKey, {
            audience: this.configService.get<string>('auth.audience'),
        });
    }
}
