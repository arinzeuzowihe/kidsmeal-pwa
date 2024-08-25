export interface BaseUser {
    id: number,
    username: string
};

export interface BaseKid {
    id: number,
    name: string,
    profilePicUrl: string
};

export interface BaseMeal {
    mealId?: number;
    mealName: string,
    mealDescription: string  
};

export interface MealSuggestion extends BaseMeal {
    suggestionID: number,
    kidId: number,
    isConfirmed: boolean,
    mealType: string
};

export interface MealHistory extends BaseMeal {
    kidID: number,
    eatenOn: string,
    mealType: string
}

export interface LoginResponse {
    userID: number,
    username: string,
    wasSuccessful: boolean,
    kids: Kid[],
    errorMessage: string
}

export interface BasicMealPreference {
    mealId: number;
    mealName: string;
    isActive: boolean;
}

export interface DetailedMealPreference {
    mealId: number;
    mealName: string;
    mealDescription: string;
    mealTypes: number[];
    isSideDish: boolean;
    isTakeout: boolean;
}

export enum ResponseErrorCodes {
    MEAL_HIST_EXIST
}

// TODO: Replace Kid type with BaseKid contract
type Kid = {
    kidID: number,
    name: string,
    profilePicUrl: string
}