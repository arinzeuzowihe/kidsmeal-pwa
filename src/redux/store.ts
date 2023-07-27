import { configureStore } from "@reduxjs/toolkit";
import mealSuggestionReducer from './slices/mealSuggestionSlice';

const store = configureStore({
    reducer: {
        mealSuggestion: mealSuggestionReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;