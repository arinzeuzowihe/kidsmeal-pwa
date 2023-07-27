export interface BaseKid {
    id: number,
    name: string
};

export interface BaseMeal {
    mealName: string,
    mealDescription: string,
    mealType: string    
};

export interface MealSuggestion extends BaseMeal {
    suggestionID: number,
    kidID: number,
    isConfirmed: boolean
};

export interface MealHistory extends BaseMeal {
    kidID: number,
    eatenOn: string
}

export interface LoginResponse {
    userID: number,
    wasSuccessful: boolean,
    kids: Kid[]
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

// TODO: Replace Kid type with BaseKid contract
type Kid = {
    kidID: number,
    name: string
}