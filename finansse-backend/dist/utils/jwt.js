"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtUtil = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class jwtUtil {
    // private static readonly token_expiry = '1m';
    // private static readonly refresh_expiry = '1m';
    static generateTokenPair(payload) {
        // console.log('payload: ', payload);
        return {
            accessToken: this.generateAccessToken(payload),
            refreshToken: this.generateRefreshToken(payload),
        };
    }
    static generateAccessToken(payload) {
        const accessToken = jsonwebtoken_1.default.sign(payload, this.SECRET_KEY, {
            expiresIn: this.token_expiry
        });
        return accessToken;
    }
    static verifyToken(token) {
        try {
            return jsonwebtoken_1.default.verify(token, this.SECRET_KEY);
        }
        catch (error) {
            if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
                throw new Error('TOKEN_EXPIRED');
            }
            else if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
                throw new Error('INVALID_TOKEN');
            }
            throw new Error('TOKEN_ERROR');
        }
    }
    static generateRefreshToken(payload) {
        return jsonwebtoken_1.default.sign(payload, this.SECRET_KEY, {
            expiresIn: this.refresh_expiry
        });
    }
    static verifyRefreshToken(token) {
        try {
            return jsonwebtoken_1.default.verify(token, this.SECRET_KEY);
        }
        catch (error) {
            throw new Error('INVALID_REFRESH_TOKEN');
        }
    }
}
exports.jwtUtil = jwtUtil;
jwtUtil.SECRET_KEY = process.env.JWT_SECRET || 'secret';
jwtUtil.token_expiry = '30m';
jwtUtil.refresh_expiry = '7d';
//# sourceMappingURL=jwt.js.map