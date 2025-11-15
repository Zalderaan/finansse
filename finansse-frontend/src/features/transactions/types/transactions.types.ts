export interface Transaction {
    account_id: number,
    transaction_id: number,
    transaction_name: string,
    transaction_amount: number,
    transaction_type: string,
    created_at: Date,
    category_id?: number,
    category?: {
        category_name: string
    }
}

export interface CreateTransactionRequest {
    name: string,
    amount: number,
    type: string,
    account_id: number
    category_id: number,
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

