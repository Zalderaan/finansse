import { axiosInstance } from "@/lib/axios"
import type { UserBalanceTrendResponse } from "@/features/reports/types/reports.types"

const prefix = 'reports'
export const reportsApiService = {
    getBalanceTrend: async (period: string): Promise<UserBalanceTrendResponse> => {
        const response = await axiosInstance.get(`${prefix}/balance-trend`);
        return response.data;
    }
}