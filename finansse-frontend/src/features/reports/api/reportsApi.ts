import { axiosInstance } from "@/lib/axios"
import type { UserBalanceTrendResponse, DashboardDataResponse, IncomeByCategoryResponse, SpendingByCategoryResponse } from "@/features/reports/types/reports.types"

const prefix = 'reports'
export const reportsApiService = {
    getBalanceTrend: async (period: string): Promise<UserBalanceTrendResponse> => {
        const response = await axiosInstance.get(`${prefix}/balance-trend`, { params: { period } });
        return response.data;
    },

    getDashboardData: async (): Promise<DashboardDataResponse> => {
        const response = await axiosInstance.get(`${prefix}/dashboard-data`);
        return response.data;
    },

    getUserIncomeByCategory: async (): Promise<IncomeByCategoryResponse> => {
        console.log("getUserIncomeByCategory() called!");
        const response = await axiosInstance.get(`${prefix}/income-by-category`);
        console.log("response.data from userIncomeByCategory: ", response.data);
        return response.data;
    },

    getUserSpendingByCategory: async (): Promise<SpendingByCategoryResponse> => {
        console.log("getUserSpendingByCategory() called!");
        const response = await axiosInstance.get(`${prefix}/spending-by-category`);
        console.log("response.data from userSpendingByCategory: ", response.data);
        return response.data;
    }
}