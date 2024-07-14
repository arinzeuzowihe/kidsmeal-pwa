import React, { useEffect, useState } from "react";
import './MealHistoryList.css';
import MealService from "../services/meal.service";
import { BaseKid, MealHistory } from "../interfaces/api/responses";
import Spinner from "./Spinner";
import UserService from "../services/user.service";
import Dropdown from "./base/Dropdown";
import { MealType } from "../interfaces/common.interfaces";

interface MealHistoryListProps {
    refreshData?: boolean;
}

function MealHistoryList(props: MealHistoryListProps) {
    const mealService = MealService.getInstance();
    const userService = UserService.getInstance();
    const [unfilteredMealHistoryEntries, setUnfilteredMealHistoryEntries] = useState<MealHistory[] | undefined>(undefined);
    const [filteredMealHistoryEntries, setFilteredMealHistoryEntries] = useState<MealHistory[] | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const fallbackProfilePic = require('../img/default-kid-pic.png');
    const kids: BaseKid[] = userService.getKids();
    const mealTypeEnumValues: number[] = getMealTypeEnumValues();
    const [kidFilter, setKidFilter] = useState<string[]>([]);
    const [mealTypeFilter, setMealTypeFilter] = useState<string[]>([]);
    const [mealSearchTerm, setMealSearchTerm] = useState<string>('');

    useEffect(() => {
        if (kids.length < 1)
            return;

        const fetchMealHistory = async () => {
            setIsLoading(true);
            const recentMealHistories = await mealService.getMealHistoryAsync();
            setUnfilteredMealHistoryEntries(recentMealHistories);
            setFilteredMealHistoryEntries(recentMealHistories);
        };

        fetchMealHistory()
            .catch((errorMessage) => {
                console.error(errorMessage)
            })
            .finally(() => {
                setIsLoading(false);
            });

    }, [props?.refreshData]);

    useEffect(() => {
        var inProgressFilteredMealHistoryEntries = unfilteredMealHistoryEntries;
        if (kidFilter.length > 0) {            
            inProgressFilteredMealHistoryEntries = inProgressFilteredMealHistoryEntries?.filter(mh => kidFilter.includes(mh.kidID.toString()));
        }
        if (mealTypeFilter.length > 0) {
            inProgressFilteredMealHistoryEntries = inProgressFilteredMealHistoryEntries?.filter(mh => mealTypeFilter.includes(mh.mealType));
        }
        if (mealSearchTerm && mealSearchTerm.length > 0) {
            inProgressFilteredMealHistoryEntries = inProgressFilteredMealHistoryEntries?.filter(mh => mh.mealName.toLowerCase().includes(mealSearchTerm.toLowerCase()));
        }
        setFilteredMealHistoryEntries(inProgressFilteredMealHistoryEntries);
    }, [kidFilter, mealTypeFilter, mealSearchTerm])

    function getMealTypeEnumValues() : number[]
    {
        let enumValues = Object.keys(MealType).map((mealTypeValue, index) => {
            const mealTypeEnumValue = Number(mealTypeValue);
            return mealTypeEnumValue;
        });

        return enumValues.filter(ev => !isNaN(ev)); 
    }

    return (
        <>
            <div>
                <div className="uk-margin-small-bottom">
                    <Dropdown
                        items={kids.map((kid, index) => {
                            return {
                                name: kid.name,
                                value: kid.id.toString()
                            };
                        })}
                        placeholderText={"--Filter By Kid--"}
                        isAllSelectionSupported={true}
                        allSelectionText={"All Kids"}
                        onSelectionChange={(val) => setKidFilter(val)} />
                </div>
                <div className="uk-margin-small-bottom">
                    <Dropdown
                        items={mealTypeEnumValues.map((mealTypeEnumValue, index) => {
                            return {
                                name: MealType[mealTypeEnumValue],
                                value: MealType[mealTypeEnumValue].toString()
                            }
                        })}
                        placeholderText={"--Filter By Meal Type--"}
                        isAllSelectionSupported={true}
                        allSelectionText={"All Meal Types"}
                        onSelectionChange={(val) => setMealTypeFilter(val)} />
                </div>
                <div className="uk-margin-small-bottom">
                    <input className="uk-input uk-form-width-large"
                        type="text"
                        placeholder="Enter Meal Name"
                        value={mealSearchTerm}
                        onInput={(event: any) => setMealSearchTerm(event.target.value)} />
                </div>
            </div>
            <div>
                {
                    isLoading && <Spinner ratio="5" text="Loading...." />
                }
            </div>
            <div>
                {
                    (filteredMealHistoryEntries && filteredMealHistoryEntries.length > 0) &&
                    <table className="uk-table uk-table-small uk-table-striped">
                        <thead>
                            <tr>
                                <th colSpan={3}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filteredMealHistoryEntries?.map((entry, index) => {
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
                }
            </div>
            <div>
                {
                    (!filteredMealHistoryEntries || filteredMealHistoryEntries.length <= 0) &&
                    <div className="uk-card  uk-card-default uk-card-body uk-text-center">
                        <div className="uk-margin-bottom-remove"><span className="uk-icon" uk-icon="icon: plus-circle; ratio: 2"></span></div>
                        <h2 className="uk-margin-small">No Meal History</h2>
                        <div>Sorry no meal history has been recorded for any kiddos yet.</div>
                            
                    </div>
                }
            </div>
        </>
    );
}

export default MealHistoryList;