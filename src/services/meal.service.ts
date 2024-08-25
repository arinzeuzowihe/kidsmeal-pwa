import { BaseMealPreferenceRequest, MealHistoryRequest, UpsertMealPreferenceRequest, MealSuggestionRequest, SaveMealSuggestionRequest, MealSuggestionReview, ReviewMealSuggestionsRequest } from "../interfaces/api/requests";
import { BaseKid, BaseMeal, BasicMealPreference, DetailedMealPreference, MealHistory, MealSuggestion, ResponseErrorCodes } from "../interfaces/api/responses";
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

    async getMealAsync(mealId: number): Promise<BaseMeal> {
        return await this.getAsync(`/meal/${mealId}`);
    }

    async getMealHistoryAsync(kidId?: number, totalDays?: number): Promise<MealHistory[]> {
        const allKidIds = this.currentKids.map((kid) => {
            return kid.id;
        });
        const request: MealHistoryRequest = {
            kidIds: (kidId) ? [kidId] : allKidIds,
            daysFromToday: totalDays
        };

        const response = await this.postAsync('/meal/history', request);
        if (response) {
            return response;
        }
        return [];
    }

    public async getPendingMealSuggestionsAsync(): Promise<MealSuggestion[]> {
        const kidIds = this.currentKids?.map((kid: BaseKid) => { return kid.id});
        const response = await this.postAsync('/meal/suggestion/pending', kidIds);
        return response.pendingSuggestions as MealSuggestion[];
    }

    public async getMealSuggestionAsync(kidIds: number[], mealType: MealType, includeTakeOut: boolean, sameMealForAll: boolean): Promise<{ suggestions: MealSuggestion[], errorCode?: ResponseErrorCodes}> {
        const request: MealSuggestionRequest = {
            kidIds,
            mealType,
            includeTakeOut,
            sameMealForAll
        }
        const response = await this.postAsync('/meal/suggestion/generate', request);
        return {
            suggestions: response?.pendingSuggestions,
            errorCode: response?.errorCode
        }
            
    }

    public async saveMealSuggestionsAsync(suggestedMeals: MealSuggestion[]):Promise<MealSuggestion[]> {
        const request: SaveMealSuggestionRequest = {
            mealSuggestions: suggestedMeals
        };

        const reponse = await this.postAsync('/meal/suggestion', request);
        return reponse.pendingSuggestions;
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

    public async reviewMealSuggestionsAsync(reviews: MealSuggestionReview[]): Promise<void> {
        var request: ReviewMealSuggestionsRequest = {
            userID: this.currentUserID,
            reviews
        };

        await this.postAsync('/meal/suggestion/review', request);
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