export interface User {
    uid: number;
    username: string;
    email: string;

    /*
    * examples in production environments
        // Expense-specific fields
        defaultCurrency?: string;
        monthlyBudget?: number;
        preferences?: {
            theme: 'light' | 'dark';
            currency: string;
            budgetAlerts: boolean;
            weeklyReports: boolean;
        };

        // Basic account info
        isEmailVerified: boolean;
        */
    createdAt: string;
    updatedAt: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    success: string;
    message: string;
    accessToken: string;
    user_data: User;
}

export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
}

// TODO: Register response

export interface RefreshTokenRequest {
    accessToken: string
}

export interface RefreshTokenResponse {
    accessToken: string,
    refreshToken?: string // some implementations return new refresh tokens too (might do so in the future)
}
