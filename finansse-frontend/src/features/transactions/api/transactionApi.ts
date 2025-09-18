import { axiosInstance } from "@/lib/axios";
import type { CreateTransactionRequest, CreateAccountResponse } from "../types/transactions.types";

const prefix = 'transactions'
export const transactionApiService = {
    createTransaction: async (data: CreateTransactionRequest): Promise<CreateAccountResponse> => {
        const response = await axiosInstance.post(`${prefix}/create`, data);
        return response.data;
    }
}