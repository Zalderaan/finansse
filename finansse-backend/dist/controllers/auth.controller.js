"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_model_1 = require("../models/auth.model");
const jwt_1 = require("../utils/jwt");
class AuthController {
    // POST /auth/register
    static register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
                const existingUser = yield auth_model_1.AuthModel.findUserByEmail(email);
                if (existingUser) {
                    return res.status(409).json({
                        success: false,
                        message: 'User email already in use.'
                    });
                }
                // create user
                const createdUser = yield auth_model_1.AuthModel.createUser({ username, email, password });
                const { user_password_hash } = createdUser, createdUserNoHash = __rest(createdUser, ["user_password_hash"]); // extract password from createdUser
                return res.status(201).json({
                    success: true,
                    message: 'User registered successfully.',
                    data: createdUserNoHash
                });
            }
            catch (error) {
                console.error('Registration error: ', error);
                res.status(500).json({
                    success: false,
                    message: "Internal server error."
                });
            }
        });
    }
    // POST /auth/login
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                // find user
                const user = yield auth_model_1.AuthModel.findUserByEmail(email);
                if (!user) {
                    return res.status(401).json({
                        success: false,
                        message: "Invalid email or password."
                    });
                }
                // if exists, compare password
                const isValidPassword = yield auth_model_1.AuthModel.validatePassword(password, user.user_password_hash);
                if (!isValidPassword) {
                    return res.status(401).json({
                        success: false,
                        message: "Invalid email or password."
                    });
                }
                const tokenPayload = {
                    userId: user.user_id,
                    username: user.user_username,
                    userEmail: user.user_email
                };
                // generate JWT tokens
                const tokens = jwt_1.jwtUtil.generateTokenPair(tokenPayload);
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
            }
            catch (error) {
                console.error("Login error: ", error);
                return res.status(500).json({
                    success: false,
                    message: "Internal server error"
                });
            }
        });
    }
    // POST /auth/logout
    static logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
            }
            catch (error) {
                console.error('Logout error: ', error);
                return res.status(500).json({
                    success: false,
                    message: 'User logged out failed'
                });
            }
        });
    }
    // POST /auth/refresh
    static refresh(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            console.log('🚀 Refresh endpoint hit');
            console.log('🍪 Raw cookie header:', req.headers.cookie);
            console.log('🍪 Parsed cookies:', req.cookies);
            console.log('🔍 RefreshToken from cookies:', req.cookies.refreshToken);
            try {
                const refreshToken = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.refreshToken;
                if (!refreshToken) {
                    return res.status(401).json({
                        success: false,
                        message: 'No refresh token provided'
                    });
                }
                // Verify token (throws if invalid)
                let validated;
                try {
                    validated = jwt_1.jwtUtil.verifyToken(refreshToken);
                }
                catch (_b) {
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
                };
                // Refresh token rotation
                const tokens = jwt_1.jwtUtil.generateTokenPair(cleanPayload);
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
            }
            catch (error) {
                console.error('Token refresh error:', error);
                return res.status(403).json({
                    success: false,
                    message: 'Invalid or expired refresh token'
                });
            }
        });
    }
    // GET /auth/me
    static getMe(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
                console.log('userId in getMe: ', userId);
                if (!userId) {
                    return res.status(401).json({ error: 'Unauthorized' });
                }
                const user = yield auth_model_1.AuthModel.findUserById(userId);
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
            }
            catch (error) {
                console.error('Error in getMe: ', error);
                return res.status(500).json({
                    success: false,
                    error: 'Internal server error',
                });
            }
        });
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map