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

export interface DashboardDataResponse {
    success: boolean,
    data: {
        totalIncome: number,
        totalExpense: number,
        currentBalance: number,
    }
}

export interface IncomeByCategoryItem {
    category_id: string,
    category_name: string,
    total_amount: number,
    [key: string]: string | number // needed for PieChart
}
export interface IncomeByCategoryResponse {
    success: boolean,
    data: IncomeByCategoryItem[]
}

export interface SpendingByCategoryItem {
    category_id: string,
    category_name: string,
    total_amount: number,
    [key: string]: string | number // needed for PieChart
}
export interface SpendingByCategoryResponse {
    success: boolean,
    data: SpendingByCategoryItem[]
}

