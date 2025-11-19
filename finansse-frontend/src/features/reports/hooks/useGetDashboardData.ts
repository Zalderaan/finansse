import { useAuthStore } from "@/features/auth/stores/auth.store";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useGetDashboardData() {
    const queryClient = useQueryClient();
    const user = useAuthStore();

    const query = useQuery
}