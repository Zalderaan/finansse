import { axiosInstance } from "@/lib/axios"
import type { UserBalanceTrendResponse,DashboardDataResponse } from "@/features/reports/types/reports.types"

const prefix = 'reports'
export const reportsApiService = {
    getBalanceTrend: async (period: string): Promise<UserBalanceTrendResponse> => {
        const response = await axiosInstance.get(`${prefix}/balance-trend`, { params: { period } });
        return response.data;
    },

    getDashboardData: async (): Promise<DashboardDataResponse> => {
        const response = await axiosInstance.get(`${prefix}/dashboard-data`);
        return response.data;
    }
}