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
                userEmail: user.user_email
            }

            // generate JWT tokens
            const tokens = jwtUtil.generateTokenPair(tokenPayload);

            // Set http-only cookie for refresh token
            res.cookie('refreshToken', tokens.refreshToken, {
                // ! httpOnly cannot be accessed by browser JS if true
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 7 * 24 * 600 * 60 * 1000,
                path: '/auth/refresh'
            });
            return res.status(201).json({
                success: true,
                message: "User logged in successfully!",
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken,
                user_data: {
                    uid: user.user_id,
                    username: user.user_username,
                    email: user.user_email,
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

    // GET /auth/me
    static async getMe(req: AuthRequest, res: Response) {
        try {
            const userId = req.user?.userId;
            console.log('userId: ', userId)

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
                email: user.user_email
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