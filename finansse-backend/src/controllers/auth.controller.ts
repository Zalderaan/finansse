import { Response, Request } from 'express';
import { AuthModel } from "../models/auth.model";
import { jwtUtil } from "../utils/jwt";
import { AuthRequest } from '../utils/auth.middleware';
export class AuthController {
    // POST /auth/register
    static async register(req: Request, res: Response) {
        try {
            const { username, email, password } = req.body;

            // validation
            if (!username || !email || !password) {
                return res.status(400).json({
                    success: false,
                    message: 'All fields are required.'
                });
            }

            // check if user already exists
            const existingUser = await AuthModel.findUserByEmail(email);
            if (existingUser) {
                return res.status(409).json({
                    success: false,
                    message: 'User email already in use.'
                });
            }

            // create user
            const createdUser = await AuthModel.createUser({ username, email, password });
            const { user_password_hash, ...createdUserNoHash } = createdUser // extract password from createdUser

            return res.status(201).json({
                success: true,
                message: 'User registered successfully.',
                data: createdUserNoHash
            });
        } catch (error) {
            console.error('Registration error: ', error);
            res.status(500).json({
                success: false,
                message: "Internal server error."
            });
        }
    }

    // POST /auth/login
    static async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            // find user
            const user = await AuthModel.findUserByEmail(email);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found."
                });
            }

            // if exists, compare password
            const isValidPassword = await AuthModel.validatePassword(password, user.user_password_hash)
            if (!isValidPassword) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid credentials."
                })
            }

            const tokenPayload = {
                userId: user.user_id,
                username: user.user_username,
                userEmail: user.user_email
            }

            // generate JWT tokens
            const tokens = jwtUtil.generateTokenPair(tokenPayload);

            // Set http-only cookie for refresh token
            res.cookie('refreshToken', tokens.refreshToken, {
                // ! httpOnly cannot be accessed by browser JS if true
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 7 * 24 * 60 * 60 * 1000,
                // maxAge: 60 * 1000
            });
            return res.status(201).json({
                success: true,
                message: "User logged in successfully!",
                accessToken: tokens.accessToken,
                user_data: {
                    uid: user.user_id,
                    username: user.user_username,
                    email: user.user_email,
                    created_at: user.user_created_at,
                },
            });
        } catch (error) {
            console.error("Login error: ", error);
            return res.status(500).json({
                success: false,
                message: "Internal server error"
            })
        }
    }

    // POST /auth/logout
    static async logout(req: Request, res: Response) {
        try {
            // clear cookies
            res.clearCookie('refreshToken', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax'
            });

            // * optional: implement token blacklisting

            return res.status(200).json({
                success: true,
                message: 'User logged out successfully!'
            });
        } catch (error) {
            console.error('Logout error: ', error);
            return res.status(500).json({
                success: false,
                message: 'User logged out failed'
            })
        }
    }

    // POST /auth/refresh
    static async refresh(req: Request, res: Response) {
        console.log('🚀 Refresh endpoint hit');
        console.log('🍪 Raw cookie header:', req.headers.cookie);
        console.log('🍪 Parsed cookies:', req.cookies);
        console.log('🔍 RefreshToken from cookies:', req.cookies.refreshToken);
        try {
            const refreshToken = req.cookies?.refreshToken;

            if (!refreshToken) {
                return res.status(401).json({
                    success: false,
                    message: 'No refresh token provided'
                });
            }

            // Verify token (throws if invalid)
            let validated;
            try {
                validated = jwtUtil.verifyToken(refreshToken);
            } catch {
                return res.status(403).json({
                    success: false,
                    message: 'Invalid refresh token'
                });
            }

            // If verification returned a falsy payload
            if (!validated) {
                return res.status(403).json({
                    success: false,
                    message: 'Invalid refresh token'
                });
            }

            const cleanPayload = {
                userId: validated.userId,
                username: validated.username,
                userEmail: validated.userEmail,
            }

            // Refresh token rotation
            const tokens = jwtUtil.generateTokenPair(cleanPayload);

            res.cookie('refreshToken', tokens.refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                // secure: false,
                sameSite: 'lax',
                // sameSite: 'none',
                maxAge: 7 * 24 * 60 * 60 * 1000,
                // maxAge: 60 * 1000,
            });

            return res.status(200).json({
                success: true,
                message: 'Tokens refreshed successfully',
                accessToken: tokens.accessToken,
            });
        } catch (error) {
            console.error('Token refresh error:', error);
            return res.status(403).json({
                success: false,
                message: 'Invalid or expired refresh token'
            });
        }
    }

    // GET /auth/me
    static async getMe(req: AuthRequest, res: Response) {
        try {
            const userId = req.user?.userId;
            console.log('userId in getMe: ', userId)

            if (!userId) {
                return res.status(401).json({ error: 'Unauthorized' });
            }

            const user = await AuthModel.findUserById(userId);

            if (!user) {
                return res.status(404).json({
                    success: false,
                    error: 'User not found'
                });
            }
            return res.json({
                uid: user.user_id,
                username: user.user_username,
                email: user.user_email,
                createdAt: user.user_created_at,
                updatedAt: user.user_updated_at,
            });

        } catch (error) {
            console.error('Error in getMe: ', error);
            return res.status(500).json({
                success: false,
                error: 'Internal server error',
            });
        }
    }
}