import { useEffect, useState } from "react";
import MealHistoryList from "./MealHistoryList";
import './Home.css'
import MealService from "../services/meal.service";
import MealSuggestionList from "./MealSuggestionList";
import { BaseKid, MealSuggestion } from "../interfaces/api/responses";
import Spinner from "./Spinner";
import UserService from "../services/user.service";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/reduxHooks";
import { storeGeneratedSuggestions } from "../redux/slices/mealSuggestionSlice";

function Home(props: any) {
    const [isLoading, setIsLoading] = useState(false);
    const [pendingSuggestions, setPendingSuggestions] = useState<MealSuggestion[]>([]);
    const [kids, setKids] = useState<BaseKid[]>([]);
    const mealService = MealService.getInstance();
    const userService = UserService.getInstance();
    const [selectedKidId, setSelectedKidId] = useState<number>(0);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {

        const fecthPendingSuggestions = async () => {
            setIsLoading(true);
            const results = await mealService.getPendingMealSuggestionsAsync();
            setPendingSuggestions(results);
            setIsLoading(false);
        };

        fecthPendingSuggestions()
            .catch(console.error);

    }, []);
    
    useEffect(() => {
        const hasPendingSuggestions = pendingSuggestions && pendingSuggestions.length > 0;
        if (hasPendingSuggestions) {
            
            dispatch(storeGeneratedSuggestions({ suggestions: pendingSuggestions }))
            navigate('/suggestions');
            
            return;
        }

        setKids(() => userService.getKids());

    }, [pendingSuggestions])
    
    if (isLoading) {
        return <Spinner ratio="5" text="Loading...."/>
    }
    
    return (
        <div className="overflow-content" id="home-container">
            <div className="uk-margin-small-top" uk-sticky="end: #home-container; offset: 80">
                <ul className="uk-flex-center" uk-tab="connect: #home-tab-content; animation: uk-animation-slide-left-medium uk-animation-slide-right-medium">
                    {
                        kids.map((kid, index) => {
                            if (index === 0) {
                                return <li key={index} onClick={() => setSelectedKidId(kid.id)} className="uk-width-medium uk-active"><a href="./"><img className="uk-border-circle" src="https://styles.redditmedia.com/t5_2sws5/styles/communityIcon_shz4ogqfbtw81.png" width="50" height="50" alt="" />{kid.name }</a></li>
                            }
                            else {
                                return <li key={index} onClick={() => setSelectedKidId(kid.id)} className="uk-width-medium" ><a href="./"><img className="uk-border-circle" src="https://styles.redditmedia.com/t5_2sws5/styles/communityIcon_shz4ogqfbtw81.png" width="50" height="50" alt="" />{kid.name }</a></li>
                            }

                        })
                    }
                </ul>
            </div>
            <ul id="home-tab-content" className="uk-switcher uk-margin">
                {
                    kids.map((kid, index) => (
                    <li key={index}>
                        <MealHistoryList kidID={kid.id} refreshData={ selectedKidId === kid.id } />
                    </li>
                    ))
                }
            </ul>
        </div>
    );
}

export default Home;