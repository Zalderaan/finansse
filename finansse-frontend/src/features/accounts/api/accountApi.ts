import { axiosInstance } from "@/lib/axios";
import type { AccountsResponse, CreateAccountRequest, CreateAccountResponse, DeleteAccountResponse, GetAccountResponse } from "../types/accounts.type";

const prefix = 'accounts'
export const accountApiService = {
    // CRUD
    createAccount: async (data: CreateAccountRequest): Promise<CreateAccountResponse> => {
        const response = await axiosInstance.post(`${prefix}/create`, data);
        return response.data;
    },
    
    getAccountById: async (id: string): Promise<GetAccountResponse> => {
        const response = await axiosInstance.get(`${prefix}/${id}`);
        return response.data;
    },

    getAccounts: async (): Promise<AccountsResponse> => {
        const response = await axiosInstance.get(`${prefix}`);
        return response.data;
    },
    
    // TODO: updateAccount:
    
    deleteAccount: async (id: string): Promise<DeleteAccountResponse> => {
        const response = await axiosInstance.delete(`${prefix}/${id}`);
        return response.data;
    },
}