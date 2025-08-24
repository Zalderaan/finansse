import { axiosInstance } from "@/lib/axios";
import type { CreateAccountRequest, CreateAccountResponse, Account } from "../types/accounts.type";

const prefix = 'accounts'
export const accountApiService = {
    // CRUD
    createAccount: async (data: CreateAccountRequest): Promise<CreateAccountResponse> => {
        const response = await axiosInstance.post(`${prefix}/create`, data);
        return response.data;
    }
    
    // TODO: getAccount:
    
    // TODO: updateAccount:
    
    // TODO: deleteAccount:
}