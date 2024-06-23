import React, { useEffect, useState } from "react";
import './MealHistoryList.css';
import MealService from "../services/meal.service";
import { BaseKid, MealHistory } from "../interfaces/api/responses";
import Spinner from "./Spinner";
import UserService from "../services/user.service";

interface MealHistoryListProps {
    refreshData?: boolean;
}

function MealHistoryList(props: MealHistoryListProps) {
    const mealService = MealService.getInstance();
    const userService = UserService.getInstance();
    const [mealHistoryEntries, setMealHistoryEntries] = useState<MealHistory[] | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const fallbackProfilePic = require('../img/default-kid-pic.png');
    const kids: BaseKid[] = userService.getKids();

    useEffect(() => {
        if (kids.length < 1)
            return;

        const fetchMealHistory = async () => {
            setIsLoading(true);
            const recentMealHistories = await mealService.getMealHistoryAsync();
            setMealHistoryEntries(recentMealHistories);
        };

        fetchMealHistory()
            .catch((errorMessage) => {
                console.error(errorMessage)
            })
            .finally(() => {
                setIsLoading(false);
            });

    }, [props?.refreshData]);

    if (isLoading) {
        return <Spinner ratio="5" text="Loading...." />
    }
    else if (mealHistoryEntries && mealHistoryEntries.length > 0) {
        return (
            <table className="uk-table uk-table-small uk-table-striped">
                <thead>
                    <tr>
                        <th colSpan={3}></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        mealHistoryEntries?.map((entry, index) => {
                            const mealDate = new Date(entry.eatenOn);
                            const kid = kids.find(k => k.id === entry.kidID);
                            return (<tr key={index}>
                                <td><img className="uk-border-circle uk-preserve-width" src={kid?.profilePicUrl ?? fallbackProfilePic} width="40" height="40" alt="kid profile pic" /></td>
                                <td> {entry.mealType} : {entry.mealName}</td>
                                <td>{mealDate.toDateString()}</td>
                            </tr>)
                        })
                    }
                </tbody>
                <caption>Last 30 days of activity</caption>
            </table>
        );
    } else {
        return (
            <div className="uk-card  uk-card-default uk-card-body uk-text-center">
                <div className="uk-margin-bottom-remove"><span className="uk-icon" uk-icon="icon: plus-circle; ratio: 2"></span></div>
                <h2 className="uk-margin-small">No Meal History</h2>
                <div>Sorry no meal history has been recorded for any kiddos yet.</div>
            
            </div>
        );
    }
}

export default MealHistoryList;