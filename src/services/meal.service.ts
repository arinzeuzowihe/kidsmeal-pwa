import { PendingSuggestion } from "../interfaces/api/responses";
import BaseService from "./base.service";

class MealService extends BaseService {

    static instance: MealService;
    
    private constructor() {
        super();
        
    }

    public static getInstance(): MealService {
        if (!MealService.instance) {
            MealService.instance = new MealService();
        }

        return MealService.instance;
    }

    getMealHistory(kidID: number) {
        
    }

    public async getPendingMealSuggestionsAsync(): Promise<PendingSuggestion[]> {     
        const response = await this.postAsync('/meal/suggestion/pending', this.currentKidIDs);
        return response.pendingSuggestions as PendingSuggestion[];
    }

    getMealSuggestion(request: MealSuggestionRequest) {

    }

    getMealOptions(kidIDs: number[]) {
        
    }

    addMeal(meal: Meal) {

    }

    updateMeal(meal: Meal) {

    }

    removeMeal(mealId: number, kidIDs: number[]) {

    }
}

export default MealService;

enum MealType {
    Breakfast,
    Lunch,
    Snack,
    Dinner
}

type Meal = {
    id?: number,
    kidIds: number[],
    name: string,
    types: MealType[],
    isTakeOut: boolean,
    isSide: boolean
}

type MealHistoryResponse = {
}

type MealSuggestionRequest = {
    kidIDs: number[],
    mealType: string,
    takeoutAllowed: boolean
}

type MealSuggestionResponse = {
}