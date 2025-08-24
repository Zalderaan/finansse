export interface FinancialAccountSidebar {
    id: string;
    name: string;
    type: string
}

export interface CreateAccountRequest {
    name: string;
    currency: string;
    acc_type: string;
    initial_bal: number;
}

export interface CreateAccountResponse {
    success: string;
    message: string;
    account_data: Account;
}

export interface Account {
    id: number;
    name: string;
    currency: string;
    type: string,
    current_bal: number;
    initial_bal: number;
    created_at: Date;
    update_at: Date;
}