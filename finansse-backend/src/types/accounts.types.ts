import { AccountType } from "../generated/prisma";

export interface Account {
    name: string,
    currency: string,
    acc_type: AccountType,
    initial_bal: number,
    current_bal: number,
    user_id: number
}

export interface CreateAccountRequest {
    name: string,
    currency: string,
    acc_type: AccountType,
    initial_bal: number,
}
