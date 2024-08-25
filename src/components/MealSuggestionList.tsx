import React, { useEffect } from "react";                                                                                          
import { BasicMealPreference, MealSuggestion, ResponseErrorCodes } from "../interfaces/api/responses";
import {faCancel, faCheck, faEdit, faFrown, faRepeat, faSmile} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MealType } from "../interfaces/common.interfaces";
import MealService from "../services/meal.service";
import { useNavigate } from "react-router-dom";
import { ToastContainer, collapseToast, toast } from "react-toastify"
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { clearStoredSuggestions, storeGeneratedSuggestions } from "../redux/slices/mealSuggestionSlice";
import { MealSuggestionReview } from "../interfaces/api/requests";
import UserService from "../services/user.service";

interface AlternateMeal extends BasicMealPreference {
    mealDescription: string;
}

interface ReviewableMealSuggestion extends MealSuggestion {
    selectedAlternateMeal?: AlternateMeal,
    wasMealLiked?: boolean,
    alternateMealOptions: BasicMealPreference[]
}

function MealSuggestionList() {
    const mealService = MealService.getInstance();
    const userService = UserService.getInstance();
    const storedSuggestions = useAppSelector((state) => state.mealSuggestion.suggestions);
    const generationParams = useAppSelector((state) => state.mealSuggestion.params);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [isReviewInProgress, setIsReviewInProgress] = React.useState<boolean>();
    const [suggestionsToRetry, setsuggestionsToRetry] = React.useState<MealSuggestion[]>([]);
    const [suggestionsToEdit, setSuggestionsToEdit] = React.useState<number[]>([]);
    const [trackedAlternateMealSelection, setTrackedAlternateMealSelection] = React.useState<AlternateMeal>();
    const [reviewableSuggestions, setReviewableSuggestions] = React.useState<ReviewableMealSuggestion[]>(storedSuggestions.map((suggestion) => {
        return {
            ...suggestion,
            alternateMealOptions: []
        }
    }));

    useEffect(() => { 

        var updatedSuggestions: ReviewableMealSuggestion[] = [];

        if (isReviewInProgress) {
            // When reviews are in progess, the user may have made changes to our copy of reviewable 
            // suggestions in local state (e.g.selected alternate meal or rated something). Therefore
            //we need to merge the latest meal suggestion data (i.e. from selector) with any user edits
            //we already have locally in state.
            updatedSuggestions = reviewableSuggestions.map((reviewableSuggestion) => {

                const mealSuggestion = storedSuggestions.find(s => s.mealName == reviewableSuggestion.mealName);
                return {
                    ...mealSuggestion,
                    ...reviewableSuggestion
                }
            });
        }
        else {
            // We are not reviewing, the only time our suggestions in the store will change is if user has requested new suggestions
            // to be generated. Therefore just re-map the selectors value to our local state
            updatedSuggestions = storedSuggestions.map((suggestion) => {
                return {
                    ...suggestion,
                    alternateMealOptions: []
                }
            });
        }

        setReviewableSuggestions(updatedSuggestions);

    }, [storedSuggestions])

    useEffect(() => {
        //All suggestions have suggestionIds = 0 => not persisted and unconfirmed
        //All suggestions have suggestionIds > 0 => persisted
        //All persisted suggestion have isConfirmed = false => unconfirmed and require view

        const areSavedSuggestions = !reviewableSuggestions.some(s => s.suggestionID === 0);

        if (areSavedSuggestions) {
            const hasAnyUnconfirmedSuggestions = reviewableSuggestions.some(s => !s.isConfirmed);
            if (hasAnyUnconfirmedSuggestions) {
                toast.info('Yeah must submit your feedback before you can do anything else.');
                setIsReviewInProgress(true);
                
            }
            else {
                //Redirect to meal questionaire because there is nothing to do; the user has already reviewed (i.e. confirmed)
                //all their meal suggestions
                navigate('/nextmeal');
            }
            return;
        }

        //Suggestions have not been saved yet and we potentially made new to generate new ones
        //so make sure we have everything to try suggestions again.
        if ((generationParams.mealType === undefined || generationParams.includeTakeout === undefined)) {
            //Do some error handling because not all suggestions are confirmed but we do not have all
            //the fields required to re-generate suggestions.
            toast.error('Ooops we had an issue with your suggestion, our engineers fixing it.');
            navigate('/nextmeal');
        }

    }, []);

    useEffect(() => {
        if (!isReviewInProgress) {
            return;
        }

        //retrieve the preferred meals for each kid
        const populateAlternateOptions = async () => {

            const updatedSuggestions = await Promise.all(reviewableSuggestions.map(async (suggestion) => {
            
                //we need to get all the meal preferences for each kid and our api
                //will return the meal preferences common to all kids if we supply multiple
                //kidIds; so get each one-by-one for now.
                var mealPreferences: BasicMealPreference[] = await mealService.getMealPreferencesAsync(suggestion.kidId, true);

                return {
                    ...suggestion,
                    alternateMealOptions: mealPreferences
                };
            }));

            setReviewableSuggestions(updatedSuggestions);
        };

        populateAlternateOptions()
            .catch(console.error);

    }, [isReviewInProgress]);

    useEffect(() => {
        if (!reviewableSuggestions || reviewableSuggestions.length <= 0 || isReviewInProgress) {
            return;
        }

        //Not all suggestions have been saved and thus we are not ready to 
        //review suggestions (e.g. after suggestions are tried again)
        if (reviewableSuggestions.some(s => s.suggestionID === 0)) {
            setsuggestionsToRetry([]); //clear any retried suggestions
            return;
        }

        const hasAnyUnconfirmedSuggestions = reviewableSuggestions.some(s => !s.isConfirmed);
        if (hasAnyUnconfirmedSuggestions) {
            setIsReviewInProgress(true);
        }
        else {
            //Redirect to meal questionaire because there is nothing to do; the user has already reviewed (i.e. confirmed)
            //all their meal suggestions
            navigate('/nextmeal');
        }

    }, [reviewableSuggestions])

    const trackSuggestionsToRetry = (suggestion: MealSuggestion) => {
        if (!suggestion) {
            return;
        }

        const existingSuggestionToRetry = suggestionsToRetry.find(s => s.kidId == suggestion.kidId && s.mealName === suggestion.mealName);
        if (existingSuggestionToRetry) {
            setsuggestionsToRetry(suggestionsToRetry.filter(s => s !== existingSuggestionToRetry));
        }
        else {
            setsuggestionsToRetry([...suggestionsToRetry, suggestion]);
        }
    }

    const generateNewSuggestionsAsync = async() => {

        //Get kidIds of unconfirmed suggestions
        const kidIds = suggestionsToRetry.map(s => { return s.kidId });

        //Use props to re-execute api call
        const mealTypeEnumValue = Number(generationParams.mealType);
        if (generationParams.mealType === undefined || isNaN(mealTypeEnumValue) || generationParams.includeTakeout === undefined || generationParams.sameMealForAll === undefined || !kidIds || kidIds.length === 0) {
            return;
        }

        const response = await mealService.getMealSuggestionAsync(kidIds, generationParams.mealType, generationParams.includeTakeout, generationParams.sameMealForAll);
        if (response.errorCode === ResponseErrorCodes.MEAL_HIST_EXIST)
        {
            toast.info(`One or more kids already ate ${ MealType[generationParams.mealType]} today. Update kid or meal type selection.`)
            return;
        }
        const updatedSuggestions = [...reviewableSuggestions.filter(s => !kidIds.includes(s.kidId)), ...response.suggestions];  //Update local copy of suggestions in state
        dispatch(storeGeneratedSuggestions({suggestions: updatedSuggestions}));
    }

    const saveAllSuggestionAsync = async () => {
        //Make sure there are no suggestions to retry
        if (suggestionsToRetry?.length > 0) {
            return;
        }

        if (!reviewableSuggestions || reviewableSuggestions.length <= 0) {
            return;
        }

        //Make the api call to saves all suggestions
        const finalizedSuggestions = await mealService.saveMealSuggestionsAsync(reviewableSuggestions);
        dispatch(storeGeneratedSuggestions({ suggestions: finalizedSuggestions }));
    }

    const cancelSuggestions = () => {
        //Redirect back to meal questionaire
        dispatch(clearStoredSuggestions());
        navigate('/nextmeal');
    }

    const submitReview = async () => {
        //Make api to confirm the suggestions and record the history of the meal
        var reviews: MealSuggestionReview[] = reviewableSuggestions.map((suggestion) => {
            let review: MealSuggestionReview = {
                mealSuggestionID: suggestion.suggestionID,
                wasMealLiked: !!suggestion.wasMealLiked
            };

            if (suggestion.selectedAlternateMeal) {
                review.alternateMealID = suggestion.selectedAlternateMeal.mealId;
                review.alternateMealName = suggestion.selectedAlternateMeal.mealName;
                review.alternateMealDescription = suggestion.selectedAlternateMeal.mealDescription;
            }

            return review;
        });

        await mealService.reviewMealSuggestionsAsync(reviews).then(() => {
            //Redirect to home
            navigate('/');
        });
    }

    const trackAlternateMealSelectionChange = async (suggestionID: number, alternateMealId: number) => {
        
        let mealSuggestionToUpdate = reviewableSuggestions.find(s => s.suggestionID === suggestionID);
        if (!mealSuggestionToUpdate) {
            return;
        }

        //TODO: Might want to cache these calls just in case they are done over and over again
        var meal = await mealService.getMealAsync(alternateMealId); 
        
        let selectedAltMealOption = mealSuggestionToUpdate.alternateMealOptions.find(m => m.mealId === alternateMealId);

        if (selectedAltMealOption) {
            setTrackedAlternateMealSelection({ ...selectedAltMealOption, mealDescription: meal.mealDescription });
        }
    }

    const rateMealSuggestion = (suggestionID: number, wasMealLiked: boolean) => {
        let mealSuggestionToRate = reviewableSuggestions.find(s => s.suggestionID === suggestionID);
        if (!mealSuggestionToRate) {
            return;
        }

        mealSuggestionToRate.wasMealLiked = wasMealLiked;
        //Doing it this way to preserve order of item displayed
        const updatedSuggestions = reviewableSuggestions.map((suggestion) => {
            if (!suggestion)
                return;

            if (suggestion.suggestionID === suggestionID) {
                return mealSuggestionToRate;
            }

            return suggestion;
        });
        setReviewableSuggestions(updatedSuggestions.filter(s => (!!s))  as ReviewableMealSuggestion[]);
    }

    const initiateSuggestionEdit = (suggestionID: number) => {
        if (suggestionsToEdit.includes(suggestionID)) {
            return;
        }

        setSuggestionsToEdit([...suggestionsToEdit, suggestionID]);
    }

    const cancelAlternateMealChange = (suggestionID: number) => {

        const mealSuggestionToRevert = reviewableSuggestions.find(s => s.suggestionID === suggestionID);
        if (!mealSuggestionToRevert) {
            return;
        }

        //simply clear any tracked changes
        setTrackedAlternateMealSelection(undefined);

        setSuggestionsToEdit(suggestionsToEdit.filter(id => id !== suggestionID) ?? []);

    }

    const acceptAlternateMealChange = (suggestionID: number) => {

        //Check if we have tracked an change to an alternate meal option
        if (!trackedAlternateMealSelection) {
            return;
        }

        let mealSuggestionToUpdate = reviewableSuggestions.find(s => s.suggestionID === suggestionID);
        if (!mealSuggestionToUpdate) {
            return;
        }

        //clear any previous ratings
        mealSuggestionToUpdate.wasMealLiked = undefined;
        
        //Update the alternate meal
        const wasChangedBackToInitialSuggestion = trackedAlternateMealSelection.mealName === mealSuggestionToUpdate.mealName;
        mealSuggestionToUpdate.selectedAlternateMeal = wasChangedBackToInitialSuggestion ? undefined : trackedAlternateMealSelection;
        
        //Doing it this way to preserve order of item displayed
        const updatedSuggestions = reviewableSuggestions.map((suggestion) => {
            if (!suggestion)
                return;

            if (suggestion.suggestionID === suggestionID) {
                return mealSuggestionToUpdate;
            }

            return suggestion;
        });

        setReviewableSuggestions(updatedSuggestions.filter((item) => item) as ReviewableMealSuggestion[]);

        setSuggestionsToEdit(suggestionsToEdit.filter(id => id !== suggestionID));

        //you can clear the selected meal option because we alreayd have it saved in our meal suggestion object
        setTrackedAlternateMealSelection(undefined);
    }

    return (
        <>
            <ToastContainer position="bottom-right"
                autoClose={5000}
                limit={1}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover />
                    <div className="uk-border-rounded uk-position-center">
            <div className="uk-card uk-card-default uk-width-xlarge">
                <div className="uk-card-header">
                    {
                        !isReviewInProgress && <h5 className="uk-align-right"><FontAwesomeIcon size="xl" icon={faRepeat} /> - suggestions to try again</h5>
                    }
                    {
                        isReviewInProgress && <h4>How did feeding the kiddos go? Rate and Submit Feedback.</h4>
                    }
                </div>
                <div className="uk-card-body">
                    {
                            reviewableSuggestions.map((suggestion, index) => {
                                const fallbackProfilePic = require('../img/default-kid-pic.png');
                                const kid = userService.getKid(suggestion.kidId);
                                const isEdit = suggestionsToEdit.includes(suggestion.suggestionID);
                            return <article key={index} className="uk-comment uk-comment-primary uk-margin-small-bottom" role="comment">
                                <header className="uk-comment-header">
                                    {
                                        isReviewInProgress && <div className="uk-align-right">
                                            {
                                                isEdit && <>
                                                    <a className="uk-icon-button" onClick={() => acceptAlternateMealChange(suggestion.suggestionID)}>
                                                        <FontAwesomeIcon size="xl" icon={faCheck} color="green" />
                                                    </a>
                                                    <a className="uk-icon-button" onClick={() => cancelAlternateMealChange(suggestion.suggestionID)}>
                                                        <FontAwesomeIcon size="xl" icon={faCancel} color="red" />
                                                    </a>
                                                </>
                                            }
                                            {
                                                !isEdit && <a className="uk-icon-button" onClick={() => initiateSuggestionEdit(suggestion.suggestionID)}>
                                                    <FontAwesomeIcon size="xl" icon={faEdit} color="black" />
                                                </a>
                                            }
                                        </div>
                                    }
                                    <div className="uk-grid-medium uk-flex-middle" uk-grid="true">
                                        <div className="uk-width-auto">
                                            <img className="uk-border-circle" src={ kid?.profilePicUrl ?? fallbackProfilePic} width="65" height="65" alt="kid profile pic" />
                                        </div>
                                        <div className="uk-width-expand">
                                            <h4 className="uk-comment-title uk-margin-remove">
                                                {
                                                    !isEdit && (suggestion.selectedAlternateMeal ? suggestion.selectedAlternateMeal.mealName : suggestion.mealName)
                                                }
                                                {
                                                    isEdit && <select className="uk-select uk-width-medium"
                                                    disabled={!isEdit}
                                                    defaultValue={suggestion.alternateMealOptions.find(o => o.mealName == (suggestion.selectedAlternateMeal ? suggestion.selectedAlternateMeal.mealName : suggestion.mealName))?.mealId}
                                                        onChange={(evt) => trackAlternateMealSelectionChange(suggestion.suggestionID, Number(evt.target.value))}>
                                                        {
                                                            suggestion.alternateMealOptions.map((mealOption, index) => {
                                                                return <option key={index}
                                                                    value={mealOption.mealId}>{mealOption.mealName}</option>
                                                             })
                                                        }                                                  
                                                    </select>
                                                }
                                            </h4>
                                            {
                                                !isEdit && <ul className="uk-comment-meta uk-subnav uk-subnav-divider uk-margin-remove-top">
                                                    <li>{isNaN(Number(suggestion.mealType)) ? "N/A" : MealType[Number(suggestion.mealType)]}</li>
                                                    {
                                                        !isReviewInProgress &&<li>
                                                            <a className="uk-icon-button" onClick={() => trackSuggestionsToRetry(suggestion)}>
                                                                <FontAwesomeIcon size="2xl" icon={faRepeat} color={suggestionsToRetry.some(s => s === suggestion) ? "#333" : "#999"} />
                                                            </a>
                                                        </li>
                                                    }
                                                    {
                                                        isReviewInProgress &&<li>
                                                            <a className="uk-icon-button" onClick={() => rateMealSuggestion(suggestion.suggestionID, true)}>
                                                                <FontAwesomeIcon size="2xl" icon={faSmile} color={suggestion.wasMealLiked ? "#333" : "#999"} />
                                                            </a>
                                                            <a className="uk-icon-button" onClick={() => rateMealSuggestion(suggestion.suggestionID, false)}>
                                                                <FontAwesomeIcon size="2xl" icon={faFrown} color={suggestion.wasMealLiked !== undefined && !suggestion.wasMealLiked ? "#333" : "#999"} />
                                                            </a>
                                                        </li>
                                                    }
                                                </ul>
                                            }
                                        </div>
                                    </div>
                                </header>
                                {
                                    !isEdit && <div className="uk-comment-body">
                                        <p>{suggestion.selectedAlternateMeal ? suggestion.selectedAlternateMeal.mealDescription : suggestion.mealDescription}</p>
                                    </div>
                                }
                            </article>
                        })
                    }
                </div>
                <div className="uk-card-footer">
                {
                        !isReviewInProgress && <>
                            <div className="uk-margin uk-form-controls uk-align-center">
                                <button className="uk-button uk-button-default uk-width-small uk-align-left" onClick={cancelSuggestions}>Cancel</button>
                                {
                                    suggestionsToRetry.length > 0 && <button className="uk-button uk-button-primary uk-width-small uk-align-right"
                                    onClick={() => generateNewSuggestionsAsync()}>Try Again</button>
                                }
                                {
                                    suggestionsToRetry.length <= 0 && <button className="uk-button uk-button-primary uk-width-small uk-align-right"
                                    onClick={() => saveAllSuggestionAsync()}>Let's Eat</button>
                                }
                            </div>
                        </>
                        
                }
                {
                    isReviewInProgress && <div className="uk-margin uk-form-controls uk-align-center">
                            <button className="uk-button uk-button-primary uk-width-medium uk-align-center"
                                disabled={reviewableSuggestions.some(s => s.wasMealLiked === undefined)}
                                onClick={() => submitReview()}>Submit Feedback</button>
                    </div>
                }
                </div>
            </div>
        </div>
        </>
    );
}

export default MealSuggestionList;