export interface User {
    uid: number;
    username: string;
    email: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    success: string;
    message: string;
    accessToken: string;
    refreshToken: string;
    user_data: User;
}

export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
}
