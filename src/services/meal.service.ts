import { BaseMealPreferenceRequest, MealHistoryRequest, UpsertMealPreferenceRequest } from "../interfaces/api/requests";
import { BaseKid, BasicMealPreference, DetailedMealPreference, MealHistory, PendingSuggestion } from "../interfaces/api/responses";
import { MealType } from "../interfaces/common.interfaces";
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

    async getMealHistoryAsync(kidId: number, totalDays?: number): Promise<MealHistory[]> {
        const request: MealHistoryRequest = {
            kidIds: [kidId],
            daysFromToday: totalDays
        };

        const reponse = await this.postAsync('/meal/history', request);
        if (reponse) {
            const historyDictionary: {[kidId: number]: MealHistory[]} = reponse.eatingHistory;
            return historyDictionary[kidId];
        }

        return [];
    }

    public async getPendingMealSuggestionsAsync(): Promise<PendingSuggestion[]> {
        const kidIds = this.currentKids?.map((kid: BaseKid) => { return kid.id});
        const response = await this.postAsync('/meal/suggestion/pending', kidIds);
        return response.pendingSuggestions as PendingSuggestion[];
    }

    getMealSuggestion(request: MealSuggestionRequest) {

    }

    public async getMealPreferencesAsync(kidId: number, activeOnly: boolean): Promise<BasicMealPreference[]> {
        const kidIds: number[] = [kidId];
        return await this.getCommonMealPreferencesAsync(kidIds, activeOnly);
    }

    public async getCommonMealPreferencesAsync(kidIds: number[], activeOnly: boolean): Promise<BasicMealPreference[]>  {
        return await this.postAsync(`/meal/preferences/${activeOnly}`, kidIds);
    }

    public async getPreferredMealDetails(mealId: number, kidIds: number[]): Promise<DetailedMealPreference> {
        return await this.postAsync(`/meal/preference/${mealId}`, kidIds);
    }

    public async addMealPreferenceAsync(kidIds: number[], preferenceDetails: DetailedMealPreference) {
        const request: UpsertMealPreferenceRequest = {
            kidIds,
            mealId: 0,
            mealName: preferenceDetails.mealName,
            mealDescription: preferenceDetails.mealDescription,
            mealTypes: preferenceDetails.mealTypes,
            isSideDish: preferenceDetails.isSideDish,
            isTakeout: preferenceDetails.isTakeout,
            isActive: true
        }; 
        
        return await this.postAsync('/meal/preferences', request);
    }

    public async updateMealPreferenceAsync(kidIds: number[], preferenceDetails: DetailedMealPreference, isActive?: boolean) {
        const request: UpsertMealPreferenceRequest = {
            kidIds,
            mealId: preferenceDetails.mealId,
            mealName: preferenceDetails.mealName,
            mealDescription: preferenceDetails.mealDescription,
            mealTypes: preferenceDetails.mealTypes,
            isSideDish: preferenceDetails.isSideDish,
            isTakeout: preferenceDetails.isTakeout,
            isActive
        }; 

        return await this.putAsync('/meal/preferences', request);
    }

    public async restoreMealPreferenceAsync(kidIds: number[], preferenceDetails: DetailedMealPreference): Promise<BasicMealPreference[]> {
        return await this.updateMealPreferenceAsync(kidIds, preferenceDetails, true);
    }

    public async removeMealPreferenceAsync(mealId: number, kidIds: number[]): Promise<BasicMealPreference[]> {
        const request: BaseMealPreferenceRequest = {
            kidIds,
            mealId
        }
        return await this.deleteAsync('/meal/preferences', request);
    }
}

export default MealService;


type Meal = {
    id?: number,
    kidIds: number[],
    name: string,
    types: MealType[],
    isTakeOut: boolean,
    isSide: boolean
}

type MealSuggestionRequest = {
    kidIDs: number[],
    mealType: string,
    takeoutAllowed: boolean
}