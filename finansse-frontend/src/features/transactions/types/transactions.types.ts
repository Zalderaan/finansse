export const TRANSACTION_TYPES = {
    INCOME: 'INCOME',
    EXPENSE: 'EXPENSE',
    TRANSFER: 'TRANSFER'
} as const;

export type TransactionType = typeof TRANSACTION_TYPES[keyof typeof TRANSACTION_TYPES];
export interface Transaction {
    account_id: number,
    transaction_id: number,
    transaction_name: string,
    transaction_amount: number,
    transaction_type: TransactionType,
    created_at: Date,
    category_id?: number,
    category?: {
        category_name: string
    },
    transfer_account_id?: number
}

export interface CreateTransactionRequest {
    name: string,
    amount: number,
    type: string,
    account_id: number,
    transfer_account_id?: number,
    category_id?: number,
}

export interface createTransactionResponse {
    success: boolean,
    message: string,
    data: Transaction
}

export interface GetTransactionByAccResponse {
    success: boolean,
    message: string,
    data: Transaction[]
}

export interface GetTransactionByUserResponse {
    sucess: boolean,
    message: string,
    data: Transaction[]
}
