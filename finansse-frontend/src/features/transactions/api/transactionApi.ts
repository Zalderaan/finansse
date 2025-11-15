import { axiosInstance } from "@/lib/axios";
import type { CreateTransactionRequest, createTransactionResponse, GetTransactionByAccResponse } from "../types/transactions.types";

const prefix = 'transactions'
export const transactionApiService = {
    createTransaction: async (data: CreateTransactionRequest): Promise<createTransactionResponse> => {
        const response = await axiosInstance.post(`${prefix}/create`, data);
        return response.data;
    },

    getTransactionByAcc: async (id: string): Promise<GetTransactionByAccResponse> => {
        const response = await axiosInstance.get(`${prefix}/account/${id}`)
        return response.data;
    }
}