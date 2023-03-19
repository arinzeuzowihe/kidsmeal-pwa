import { useEffect, useState } from "react";
import MealHistoryList from "./MealHistoryList";
import './Home.css'
import MealService from "../services/meal.service";
import MealSuggestionList from "./MealSuggestionList";
import { BaseKid, PendingSuggestion } from "../interfaces/api/responses";
import Spinner from "./Spinner";
import UserService from "../services/user.service";

function Home(props: any) {
    const [isLoading, setIsLoading] = useState(false);
    const [pendingSuggestions, setPendingSuggestions] = useState<PendingSuggestion[]>([]);
    const [hasPendingSuggestions, setHasPendingSuggestions] = useState<boolean>(false);
    const [kids, setKids] = useState<BaseKid[]>([]);
    const mealService = MealService.getInstance();
    const userService = UserService.getInstance();
    const [selectedKidId, setSelectedKidId] = useState<number>(0);

    useEffect(() => {

        const fecthPendingSuggestions = async () => {
            setIsLoading(true);
            const results = await mealService.getPendingMealSuggestionsAsync();
            setPendingSuggestions(results);
            setHasPendingSuggestions(pendingSuggestions && pendingSuggestions.length > 0);
            if (!hasPendingSuggestions) {
                setKids(() => userService.getKids());
            }
            setIsLoading(false);
        };

        fecthPendingSuggestions()
            .catch(console.error);

    },[]);
    
    if (isLoading) {
        return <Spinner ratio="5" text="Loading...."/>
    }
    
    if (hasPendingSuggestions) {
        return <MealSuggestionList suggestions={pendingSuggestions} displayOnly={false}/>
    }
    
    return (
        <div className="overflow-content" id="home-container">
            <div className="uk-margin-small-top" uk-sticky="end: #home-container; offset: 80">
                <ul className="uk-flex-center" uk-tab="connect: #home-tab-content; animation: uk-animation-slide-left-medium uk-animation-slide-right-medium">
                    {
                        kids.map((kid, index) => {
                            if (index == 0) {
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

// <KidsTab kids={kids} tabContentId="#home-tab-content" onTabClick={(kidId) => setSelectedKidId(kidId)}/>
export default Home;