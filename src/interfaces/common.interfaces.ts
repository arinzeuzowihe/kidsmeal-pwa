export interface SelectOptions {
    text: string,
    value: string,
    disabled?: boolean
}

export enum MealType {
    Breakfast,
    Lunch,
    Snack,
    Dinner
}

export interface MealSuggestionParams {
    kidIds: number[],
    mealType?: MealType,
    includeTakeout?: boolean,
    sameMealForAll?: boolean
}