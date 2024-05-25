import { JwtPayload } from 'jsonwebtoken';

export type TokenPayload = JwtPayload & {
    /** Permissions set */
    permissions?: string[];
};
