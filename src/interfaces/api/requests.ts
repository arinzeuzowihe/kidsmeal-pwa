export interface MealHistoryRequest {
    kidIds: number[],
    daysFromToday?: number
}

export interface LoginRequest {
    username: string,
    password: string
}
