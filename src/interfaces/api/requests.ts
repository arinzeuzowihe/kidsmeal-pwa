import { MealType } from "../common.interfaces";

export interface MealHistoryRequest {
    kidIds: number[],
    daysFromToday?: number
}

export interface LoginRequest {
    username: string,
    password: string
}

export interface BaseMealPreferenceRequest {
    kidIds: number[],
    mealId?: number
}

export interface UpsertMealPreferenceRequest extends BaseMealPreferenceRequest {
    mealName: string;
    mealDescription: string;
    mealTypes?: number[];
    isSideDish: boolean;
    isTakeout: boolean;
    isActive?: boolean;
}