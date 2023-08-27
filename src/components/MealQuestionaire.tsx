import { useEffect, useState } from "react";
import MealService from "../services/meal.service";
import UserService from "../services/user.service";
import KidSelection from "./KidSelection";
import { MealSuggestionParams, MealType } from "../interfaces/common.interfaces";
import { useAppDispatch } from "../hooks/reduxHooks";
import { storeGeneratedSuggestions } from "../redux/slices/mealSuggestionSlice";
import { useNavigate } from "react-router-dom";
import { MealSuggestion } from "../interfaces/api/responses";
import { ToastContainer, toast } from "react-toastify";

function MealQuestionaire() {
    const mealService = MealService.getInstance();
    const userService = UserService.getInstance();
    const kids = userService.getKids();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [selectedMealType, setSelectedMealType] = useState<MealType>();
    const [includeTakeOut, setIncludeTakeOut] = useState<boolean>();
    const [selectedKidIds, setSelectedKidIds] = useState<number[]>([]);
    const [pendingSuggestions, setPendingSuggestions] = useState<MealSuggestion[]>([]);

    useEffect(() => {

        const fecthPendingSuggestions = async () => {
            const results = await mealService.getPendingMealSuggestionsAsync();
            setPendingSuggestions(results);
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

    }, [pendingSuggestions])

    const generateMealSuggestionAsync = async () => {
        const mealTypeEnumValue = Number(selectedMealType);
        if (selectedMealType === undefined || isNaN(mealTypeEnumValue) || includeTakeOut === undefined || !selectedKidIds || selectedKidIds.length === 0) {
            return;
        }

        const response = await mealService.getMealSuggestionAsync(selectedKidIds, selectedMealType, includeTakeOut);

        if (!response || response.length == 0) {
            toast.info('Unable to find any suggestions. Try changing your criteria.');
            return;
        }

        const params: MealSuggestionParams = {
            kidIds: selectedKidIds,
            mealType: selectedMealType,
            includeTakeout: includeTakeOut
        }
        dispatch(storeGeneratedSuggestions({ params, suggestions: response }))
        navigate('/suggestions');
    }

    const onKidSelection = (selectedKidIds: number[]) => {
        setSelectedKidIds(selectedKidIds);
    }

    return (
        <>
            <ToastContainer position="bottom-right"
                            autoClose={5000}
                            hideProgressBar={true}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover/>
            <div className="uk-section-small uk-section-muted uk-border-rounded uk-position-center">
                <div className="uk-container">
                    <form className="uk-form uk-width-large">
                        <ul className="uk-list uk-list-large uk-list-divider">
                            <li>
                                <div className="uk-text-large uk-text-bold">1. Who will be eating this next meal?</div>
                                <div className="uk-margin uk-form-controls">
                                    <KidSelection kids={kids} onSelectionChange={onKidSelection}/>
                                </div>
                            </li>
                            <li>
                                <div className="uk-text-large uk-text-bold">2. What type of meal is the next meal?</div>
                                <div className="uk-margin uk-form-controls uk-form-controls-text">
                                    {
                                        Object.keys(MealType).map((mealTypeValue, index) => {
                                            const mealTypeEnumValue = Number(mealTypeValue);
                                            if (!isNaN(mealTypeEnumValue)) {
                                                return <div key={index} className="uk-margin-small-bottom">
                                                <label>
                                                    <input
                                                        key={index}
                                                        className="uk-radio"
                                                        type="radio"
                                                        name="mealType"
                                                        onClick={() => setSelectedMealType(mealTypeEnumValue)}/> {MealType[mealTypeEnumValue]}
                                                </label>
                                            </div>
                                            }
                                        })
                                    }
                                </div>
                            </li>
                            <li>
                                <div className="uk-text-large uk-text-bold">3. Are you open to ordering takeout?</div>
                                <div className="uk-margin uk-form-controls uk-form-controls-text">
                                    <div className="uk-margin-small-bottom">
                                        <label>
                                            <input
                                                key="include_take_out_yes"
                                                className="uk-radio"
                                                type="radio"
                                                name="takeout"
                                                onClick={() => setIncludeTakeOut(true)}/> Yes
                                        </label>
                                    </div>
                                    <div className="uk-margin-small-bottom">
                                        <label>
                                            <input
                                                key="include_take_out_no"
                                                    className="uk-radio"
                                                    type="radio"
                                                    name="takeout"
                                                    onClick={() => setIncludeTakeOut(false)}/> No
                                        </label>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <div className="uk-margin-medium">
                            <button
                                type="button"
                                className="uk-button uk-button-primary uk-width-expand"
                                onClick={() => generateMealSuggestionAsync()}>SUGGEST MEAL</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default MealQuestionaire;