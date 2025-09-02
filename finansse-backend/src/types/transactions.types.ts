import { TransactionType } from "../generated/prisma";

export interface Transaction {

}

export interface CreateTransactionRequest {
    name: string,
    amount: number,
    type: TransactionType,
    account_id: number 
}