// import { TransactionType } from "../generated/prisma";
import { TransactionType } from "../generated/prisma/enums";

export interface Transaction {

}

export interface CreateTransactionRequest {
    name: string,
    amount: number,
    type: TransactionType,
    account_id: number,
    transfer_account_id?: number,
    category_id: number,
}

export interface UpdateTransactionRequest {
    name: string,
    amount: number,
    type: TransactionType,
    account_id: number,
    transfer_account_id?: number,
    category_id: number,
}

// export interface GetTransactionsByAccRequest {
    
// }