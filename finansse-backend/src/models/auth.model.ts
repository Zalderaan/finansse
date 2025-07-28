import prisma from "../db";
import argon2 from "argon2"

export class AuthModel {
    // CREATE
    static async createUser(userData:{
        username: string;
        email: string;
        password: string;
    }) {
        const hashedPassword = await argon2.hash(userData.password); 
        const created_user = await prisma.user.create({
            data: {
                user_username: userData.username,
                user_email: userData.email,
                user_password_hash: hashedPassword,
                user_created_at: new Date()
            }
        });

        return created_user
    }

    // READ
    static async findUserByEmail(email: string) {
        return await prisma.user.findFirst({
            where: {user_email: email},
        });
    }

    static async validatePassword(orig_password: string, hashedPassword: string) {
        return await argon2.verify(orig_password, hashedPassword);
    }

    
    // UPDATE
    // DELETE
}