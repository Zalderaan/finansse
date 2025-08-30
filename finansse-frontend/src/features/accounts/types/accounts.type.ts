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
    data: Account;
}

export interface GetAccountResponse {
    sucess: string;
    message: string;
    data: Account;
}

export interface AccountsResponse {
    success: string;
    message: string;
    data: Account[];
}

export interface DeleteAccountResponse {
    suuccess: string;
    message: string;
    data: {
        account_id: number;
    }
}

export interface Account {
    account_id: number;
    account_name: string;
    account_currency: string;
    account_type: string,
    account_current_balance: number;
    account_initial_balancee: number;
    created_at: Date;
    updated_at: Date;
}