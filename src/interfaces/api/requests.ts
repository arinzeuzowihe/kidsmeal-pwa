import { MealSuggestion } from "./responses";

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

export interface MealSuggestionRequest {
    kidIds: number[],
    mealType: number,
    includeTakeOut: boolean
}

export interface SaveMealSuggestionRequest {
    ignorePendingSuggestions?: boolean;
    mealSuggestions: MealSuggestion[];
}

export interface MealSuggestionReview {
    mealSuggestionID: number;
    alternateMealID?: number;
    alternateMealName?: string;
    alternateMealDescription?: string;
    wasMealLiked: boolean;
}

export interface ReviewMealSuggestionsRequest {
    userID: number,
    reviews: MealSuggestionReview[]
}