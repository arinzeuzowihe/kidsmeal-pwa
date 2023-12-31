import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { MealSuggestion } from "../../interfaces/api/responses";
import { RootState } from "../store";
import MealService from "../../services/meal.service";
import { MealSuggestionParams } from "../../interfaces/common.interfaces";
import { stat } from "fs";

interface MealSuggestionState {
    params: MealSuggestionParams,
    suggestions: MealSuggestion[]
} 

const initialState: MealSuggestionState = {
    params: {
        kidIds: [],
        mealType: undefined,
        includeTakeout: undefined,
        sameMealForAll: undefined
    },
    suggestions: []
}

export const mealSuggestionSlice = createSlice({
    name: 'mealSuggestion',
    initialState,
    reducers: {
        storeGeneratedSuggestions: (state, action: PayloadAction<{ suggestions: MealSuggestion[], params?: MealSuggestionParams }>) => {

            if (action.payload.params) {
                state.params = action.payload.params;
            }

            state.suggestions = action.payload.suggestions;
        },
        clearStoredSuggestions: (state) => {
            state = initialState;
        }
    }
})

export const { storeGeneratedSuggestions , clearStoredSuggestions } = mealSuggestionSlice.actions;

export const selectSuggestions = (state: RootState) => state.mealSuggestion.suggestions;

export const selectSuggestionGenerationParams = (state: RootState) => state.mealSuggestion.params;

export default mealSuggestionSlice.reducer; 