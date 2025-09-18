export interface Transaction {
    account_id: number,
    transaction_id: number,
    transaction_name: string,
    transaction_amount: number,
    transaction_type: string,
    created_at: Date,
}

export interface CreateTransactionRequest {
    name: string,
    amount: number,
    type: string,
    account_id: number
}

export interface CreateAccountResponse {
    success: boolean,
    message: string,
    data: Transaction
}

