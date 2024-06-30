import { useEffect, useState } from "react";
import MealHistoryList from "./MealHistoryList";
import './Home.css'
import MealService from "../services/meal.service";
import { BaseKid, MealSuggestion } from "../interfaces/api/responses";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/reduxHooks";
import { storeGeneratedSuggestions } from "../redux/slices/mealSuggestionSlice";

function Home(props: any) {
    const [isLoading, setIsLoading] = useState(false);
    const [loadHistory, setLoadHistory] = useState(false);
    const [pendingSuggestions, setPendingSuggestions] = useState<MealSuggestion[]>([]);
    const mealService = MealService.getInstance();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const fallbackProfilePic = require('../img/default-kid-pic.png');

    useEffect(() => {

        const fecthPendingSuggestions = async () => {
            setIsLoading(true);
            const results = await mealService.getPendingMealSuggestionsAsync();
            setPendingSuggestions(results);
        };

        fecthPendingSuggestions()
            .catch(console.error)
            .finally(() => {
                setIsLoading(false);
            });

    }, []);
    
    useEffect(() => {
        // if pending suggesstions found, navigate to the suggestions UI to collect feedback 
        // otherwise do nothing so meal history list can load on its own.
        const hasPendingSuggestions = pendingSuggestions && pendingSuggestions.length > 0;
        if (hasPendingSuggestions) {
            
            dispatch(storeGeneratedSuggestions({ suggestions: pendingSuggestions }))
            navigate('/suggestions');
            
            return;
        }

        setLoadHistory(true);
    }, [pendingSuggestions])
    
    if (isLoading) {
        return <Spinner ratio="5" text="Loading...." />
    }
    
    return (
        <div>
            <div className="uk-margin-top">
                <MealHistoryList/>
            </div>
        </div>
    );
}

export default Home;