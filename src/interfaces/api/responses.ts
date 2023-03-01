export interface BaseKid {
    id: number,
    name: string
};

export interface PendingSuggestion {
    suggestionID: number,
    kidId: number,
    mealName: string,
    mealDescription: string,
    mealType: string
};