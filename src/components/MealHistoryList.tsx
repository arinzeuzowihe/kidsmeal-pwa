import React, { useEffect, useState } from "react";
import './MealHistoryList.css';
import MealHistoryEntry from './MealHistoryEntry'
import MealService from "../services/meal.service";
import { MealHistory } from "../interfaces/api/responses";
import Spinner from "./Spinner";
import { groupBy } from "../interfaces/common/helper.functions";

interface MealHistoryListProps {
    kidID: number;
}

function MealHistoryList(props: MealHistoryListProps) {

    const [groupedHistories, setGroupedHistories] = useState < {[mealDate:string]: MealHistory[]} | undefined >(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const mealService = MealService.getInstance();

    useEffect(() => {
        if (!props.kidID)
            return;
        
        const fetchMealHistory = async () => {
            setIsLoading(true);
            const recentMealHistories = await mealService.getMealHistoryAsync(props.kidID);
            if (recentMealHistories.length > 0) {
                const mealsGroupedByDate = groupBy(recentMealHistories, 'eatenOn');                
                setGroupedHistories(mealsGroupedByDate);
            }
            setIsLoading(false);
        };

        fetchMealHistory()
            .catch(errorMessage => console.error(errorMessage));

    }, []);

    if (isLoading) {
        return <Spinner ratio="5" text="Loading...."/>
    }

    if (groupedHistories) {
        return (
            <ul className="uk-list uk-list-striped uk-list-large" uk-accordion="true">
                {
                    Object.keys(groupedHistories).map((key, index) => {
                        const mealDate = new Date(key);
                                if (index == 0) {
                                    return <li key={index} className="uk-open">
                                        <a className="uk-accordion-title" href="./">{ mealDate.toDateString()}</a>
                                        <div className="uk-accordion-content">
                                            <MealHistoryEntry histories={groupedHistories[key]}/>
                                        </div>
                                    </li>
                                }
    
                                return <li key={index}>
                                    <a className="uk-accordion-title" href="./">{ mealDate.toDateString()}</a>
                                    <div className="uk-accordion-content">
                                        <MealHistoryEntry histories={groupedHistories[key]}/>
                                    </div>
                                </li>
                            })
                    }
                </ul>
        );
    }

    return (
        <ul className="uk-list uk-list-striped uk-list-large" uk-accordion="true">
            <li className="uk-open">
                <a className="uk-accordion-title" href="./">Today</a>
                <div className="uk-accordion-content">
                    Sorry no history recorded yet.....
                </div>
            </li>
        </ul>
    );
}

export default MealHistoryList;