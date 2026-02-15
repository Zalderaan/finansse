import jwt from 'jsonwebtoken'

export interface TokenPair {
    accessToken: string;
    refreshToken: string;
}

export class jwtUtil {
    private static readonly SECRET_KEY = process.env.JWT_SECRET || 'finansse_jwt_secret';
    private static readonly token_expiry: string = process.env.JWT_EXPIRES_IN  || '30m';
    private static readonly refresh_expiry: string = '7d';
    // private static readonly token_expiry = '1m';
    // private static readonly refresh_expiry = '1m';


    static generateTokenPair(payload: object): TokenPair {
        // console.log('payload: ', payload);
        return {

            accessToken: this.generateAccessToken(payload),
            refreshToken: this.generateRefreshToken(payload),
        };
    }

    static generateAccessToken(payload: object): string {
        // const accessToken = jwt.sign(payload, this.SECRET_KEY, {
        //     expiresIn: this.token_expiry
        // });
        const accessToken = jwt.sign(payload, this.SECRET_KEY, {
            expiresIn: '30m' // ! hardcoded... using token_expiry has some errors
        })
        return accessToken;
    }

    static verifyToken(token: string): any {
        try {
            return jwt.verify(token, this.SECRET_KEY);
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                throw new Error('TOKEN_EXPIRED');
            } else if (error instanceof jwt.JsonWebTokenError) {
                throw new Error('INVALID_TOKEN');
            }
            throw new Error('TOKEN_ERROR');
        }
    }

    static generateRefreshToken(payload: object): string {
        return jwt.sign(payload, this.SECRET_KEY, {
            expiresIn: '7d' // ! hardcoded... using refresh_expiry has some errors
        });
    }

    static verifyRefreshToken(token: string): any {
        try {
            return jwt.verify(token, this.SECRET_KEY);
        } catch (error) {
            throw new Error('INVALID_REFRESH_TOKEN');
        }
    }
}
