export interface BaseKid {
    id: number,
    name: string
};

export interface BaseMeal {
    mealName: string,
    mealDescription: string,
    mealType: string    
};

export interface PendingSuggestion extends BaseMeal {
    suggestionID: number,
    kidId: number
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

// TODO: Replace Kid type with BaseKid contract
type Kid = {
    kidID: number,
    name: string
}