import { Response, Request } from 'express';
import { AuthModel } from "../models/auth.model";

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
            if (existingUser){
                return res.status(409).json({
                    success: false,
                    message: 'User email already in use.'
                });
            }

            // create user
            const createdUser = await AuthModel.createUser({username, email, password});
            const {user_password_hash, ...createdUserNoHash} = createdUser // extract password from createdUser

            return res.status(201).json({
                success: true,
                message: 'User registered successfully.',
                data: createdUserNoHash
            });
        } catch (error) {
            console.error('Registration error: ', error);
            res.status(500).json({
                success: false,
                message: "Internal server error"
            });
        }
    }
}