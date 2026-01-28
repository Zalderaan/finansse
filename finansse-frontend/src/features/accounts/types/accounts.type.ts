export const AccountType = {
    CHECKING: 'CHECKING',
    SAVINGS: 'SAVINGS',
    CASH: 'CASH',
    CREDIT: 'CREDIT',
    INVESTMENT: 'INVESTMENT',
    E_WALLET: 'E_WALLET'
} as const

export type AccountType = (typeof AccountType)[keyof typeof AccountType]

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
    success: string;
    message: string;
    data: {
        account_id: number;
        account_name: string;
        account_type: AccountType;
    }
}

export interface Account {
    account_id: number;
    account_name: string;
    account_currency: string;
    account_type: AccountType,
    account_current_balance: number;
    account_initial_balancee: number;
    created_at: Date;
    updated_at: Date;
}

