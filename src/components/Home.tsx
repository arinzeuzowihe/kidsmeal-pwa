import { useEffect, useState } from "react";
import MealHistoryList from "./MealHistoryList";
import './Home.css'
import MealService from "../services/meal.service";
import MealSuggestionList from "./MealSuggestionList";
import { PendingSuggestion } from "../interfaces/api/responses";
import Spinner from "./Spinner";

function Home(props: any) {
    const [isLoading, setIsLoading] = useState(false);
    const [pendingSuggestions, setPendingSuggestions] = useState<PendingSuggestion[]>([]);
    const mealService = MealService.getInstance();

    useEffect(() => {

        const fecthPendingSuggestions = async () => {
            setIsLoading(true);
            const results = await mealService.getPendingMealSuggestionsAsync();
            setPendingSuggestions(results);
            setIsLoading(false);
        };

        fecthPendingSuggestions()
            .catch(console.error);

    },[]);
    
    if (isLoading) {
        return <Spinner ratio="5" text="Loading...."/>
    }
    else {
        if (pendingSuggestions && pendingSuggestions.length > 0) {
            return <MealSuggestionList suggestions={pendingSuggestions} displayOnly={false}/>
        }
        else {
            return (
                <div className="overflow-content" id="home-container">
                    <div className="uk-margin-small-top" uk-sticky="end: #home-container; offset: 80">
                        <ul className="uk-flex-center" uk-tab="connect: #home-tab-content; animation: uk-animation-slide-left-medium uk-animation-slide-right-medium">
                            <li className="uk-width-medium uk-active"><a href="./"><img className="uk-border-circle" src="https://styles.redditmedia.com/t5_2sws5/styles/communityIcon_shz4ogqfbtw81.png" width="50" height="50" alt="" />Son</a></li>
                            <li className="uk-width-medium" ><a href="./"><img className="uk-border-circle" src="https://styles.redditmedia.com/t5_2sws5/styles/communityIcon_shz4ogqfbtw81.png" width="50" height="50" alt="" />Daughter</a></li>
                        </ul>
                    </div>
                    <ul id="home-tab-content" className="uk-switcher uk-margin">
                        <li>
                            <MealHistoryList/>
                        </li>
                        <li>
                            <MealHistoryList/>
                        </li>
                    </ul>
                </div>
            );
        }
    }
}

export default Home;