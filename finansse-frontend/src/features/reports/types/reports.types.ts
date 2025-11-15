export interface BalanceTrendItem {
    date: Date,
    total_balance: number
}

// export interface UserBalanceTrendRequest {
//     period: string
// }

export interface UserBalanceTrendResponse {
    success: boolean,
    data: BalanceTrendItem[]
}