import { Request, Response, NextFunction } from 'express';
import { jwtUtil } from "./jwt";

export interface AuthRequest extends Request {
    user?: {
        userId: number;
        userEmail: string;
    };
}

export function authenticateToken(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        // get from auth headers first
        let token = req.headers.authorization?.split(' ')[1]; // split space bar (Bearer <token>)

        // check cookies
        if (!token) {
            console.log('No token from headers!')
            token = req.cookies?.accessToken;
        }

        console.log('cookies: ', req.cookies);

        if (!token) {
            console.log("No token from cookies!")
            return res.status(401).json({
                success: false,
                message: 'Access token required'
            });
        }

        console.log('token in middleware: ', token);
        // verify token
        const verified = jwtUtil.verifyToken(token);
        req.user = verified;
        next();
    } catch (error) {
        console.error('Token verification error: ', error);
        return res.status(403).json({
            success: false,
            message: 'Invalid or expired token'
        });
    }
}