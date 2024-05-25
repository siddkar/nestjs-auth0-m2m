import { AuthConfig } from 'src/types/config/auth-config.type';
import { Config } from 'src/types/config/confg.type';

export const config = (): Config => ({
    auth: {
        domainName: process.env.AUTH_DOMAIN_NAME,
        audience: process.env.AUTH_AUDIENCE,
        jwksUri: process.env.AUTH_JWKS_URI,
    } as AuthConfig,
});
