import React, { useEffect } from "react";                                                                                          
import { MealSuggestion } from "../interfaces/api/responses";
import {faCancel, faCheck, faEdit, faRepeat, faThumbsDown, faTry, faX} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MealType } from "../interfaces/common.interfaces";
import MealService from "../services/meal.service";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { clearStoredSuggestions, storeGeneratedSuggestions } from "../redux/slices/mealSuggestionSlice";



function MealSuggestionList() {
    const mealService = MealService.getInstance();
    const suggestions = useAppSelector((state) => state.mealSuggestion.suggestions);
    const generationParams = useAppSelector((state) => state.mealSuggestion.params);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [isReview, setIsReview] = React.useState<boolean>();
    const [suggestionsToRetry, setsuggestionsToRetry] = React.useState<MealSuggestion[]>([]);
    const [isEdit, setIsEdit] = React.useState<boolean>();
    const [isOtherOptionSelected, setIsOtherOptionSelected] = React.useState<boolean>();


    useEffect(() => {
        //All suggestions have suggestionIds = 0 => not persisted and unconfirmed
        //All suggestions have suggestionIds > 0 => persisted
        //All persisted suggestion have isConfirmed = false => unconfirmed and require view

        const areSavedSuggestions = !suggestions.some(s => s.suggestionID === 0);

        if (areSavedSuggestions) {
            const hasAnyUnconfirmedSuggestions = suggestions.some(s => !s.isConfirmed);
            if (hasAnyUnconfirmedSuggestions) {
                setIsReview(true);
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
        if (!suggestions || suggestions.length <= 0 || isReview) {
            return;
        }

        //Not all suggestions have been saved and thus we are not ready to 
        //review suggestions (e.g. after suggestions are tried again)
        if (suggestions.some(s => s.suggestionID === 0)) {
            setsuggestionsToRetry([]); //clear any retried suggestions
            return;
        }

        const hasAnyUnconfirmedSuggestions = suggestions.some(s => !s.isConfirmed);
        if (hasAnyUnconfirmedSuggestions) {
            setIsReview(true);
        }
        else {
            //Redirect to meal questionaire because there is nothing to do; the user has already reviewed (i.e. confirmed)
            //all their meal suggestions
            navigate('/nextmeal');
        }

    }, [suggestions])

    const trackSuggestionsToRetry = (suggestion: MealSuggestion) => {
        if (!suggestion) {
            return;
        }

        const existingSuggestionToRetry = suggestionsToRetry.find(s => s.kidID == suggestion.kidID && s.mealName === suggestion.mealName);
        if (existingSuggestionToRetry) {
            setsuggestionsToRetry(suggestionsToRetry.filter(s => s !== existingSuggestionToRetry));
        }
        else {
            setsuggestionsToRetry([...suggestionsToRetry, suggestion]);
        }
        
    }

    const generateNewSuggestionsAsync = async() => {

        //Get kidIds of unconfirmed suggestions
        const kidIds = suggestionsToRetry.map(s => { return s.kidID });

        //Use props to re-execute api call
        const mealTypeEnumValue = Number(generationParams.mealType);
        if (generationParams.mealType === undefined || isNaN(mealTypeEnumValue) || generationParams.includeTakeout === undefined || !kidIds || kidIds.length === 0) {
            return;
        }

        const response = await mealService.getMealSuggestionAsync(kidIds, generationParams.mealType, generationParams.includeTakeout);
        const updatedSuggestions = [...suggestions.filter(s => !kidIds.includes(s.kidID)), ...response];  //Update local copy of suggestions in state
        dispatch(storeGeneratedSuggestions({suggestions: updatedSuggestions}));
    }

    const saveAllSuggestionAsync = async () => {
        //Make sure there are no suggestions to retry
        if (suggestionsToRetry?.length > 0) {
            return;
        }

        if (!suggestions || suggestions.length <= 0) {
            return;
        }

        //Make the api call to saves all suggestions
        const finalizedSuggestions = await mealService.saveMealSuggestionsAsync(suggestions);
        dispatch(storeGeneratedSuggestions({suggestions: finalizedSuggestions}));
    }

    const cancelSuggestions = () => {
        //Redirect back to meal questionaire
        dispatch(clearStoredSuggestions());
        navigate('/nextmeal');
    }

    const submitReview = () => {
        //TODO:

        //Make api to confirm the suggestions and record the history of the meal

        //Redirect to home
    }

    const initiateSuggestionEdit = () => {
        setIsEdit(true);
    }

    const cancelSuggestionEdit = () => {
        setIsEdit(false);
    }

    const acceptSuggestionEdit = () => {
        setIsEdit(false);
    }

    return (
        <div className="uk-border-rounded uk-position-center">
            <div className="uk-card uk-card-default uk-width-xlarge">
                <div className="uk-card-header">
                    {
                        !isReview && <h5 className="uk-align-right"><FontAwesomeIcon size="xl" icon={faRepeat} /> - suggestions to try again</h5>
                    }
                    {
                        isReview && <h5 className="uk-align-">Please let us know how feeding the kiddos went?</h5>
                    }
                </div>
                <div className="uk-card-body">
                    {
                        suggestions.map((suggestion, index) => {
                            return <article key={index} className="uk-comment uk-comment-primary" role="comment">
                                <header className="uk-comment-header">
                                    {
                                        isReview && <div className="uk-align-right">
                                            {
                                                isEdit && <>
                                                    <a className="uk-icon-button" onClick={() => acceptSuggestionEdit()}>
                                                        <FontAwesomeIcon size="xl" icon={faCheck} color="green" />
                                                    </a>
                                                    <a className="uk-icon-button" onClick={() => cancelSuggestionEdit()}>
                                                        <FontAwesomeIcon size="xl" icon={faCancel} color="red" />
                                                    </a>
                                                </>
                                            }
                                            {
                                                !isEdit && <a className="uk-icon-button" onClick={() => initiateSuggestionEdit()}>
                                                    <FontAwesomeIcon size="xl" icon={faEdit} color="black" />
                                                </a>
                                            }
                                        </div>
                                    }
                                    <div className="uk-grid-medium uk-flex-middle" uk-grid="true">
                                        <div className="uk-width-auto">
                                            <img className="uk-border-circle" src="https://styles.redditmedia.com/t5_2sws5/styles/communityIcon_shz4ogqfbtw81.png" width="50" height="50" alt="" />
                                        </div>
                                        <div className="uk-wdith-expand">
                                            <h4 className="uk-comment-title uk-margin-remove">
                                                {
                                                    !isEdit && suggestion.mealName
                                                }
                                                {
                                                    isEdit && <select className="uk-select" disabled={!isEdit}>
                                                        <option value={"1"}>RRRRR</option>
                                                    </select>
                                                }
                                            </h4>
                                            <ul className="uk-comment-meta uk-subnav uk-subnav-divider uk-margin-remove-top">
                                                <li>{isNaN(Number(suggestion.mealType)) ? "N/A" : MealType[Number(suggestion.mealType)]}</li>
                                                {
                                                    !isReview &&<li>
                                                        <a className="uk-icon-button" onClick={() => trackSuggestionsToRetry(suggestion)}>
                                                            <FontAwesomeIcon size="2xl" icon={faRepeat} color={suggestionsToRetry.some(s => s === suggestion) ? "#333" : "#999"} />
                                                        </a>
                                                    </li>
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </header>
                                <div className="uk-comment-body">
                                    {
                                        !isOtherOptionSelected && <p>{suggestion.mealDescription}</p>
                                    }
                                    {
                                        isOtherOptionSelected && <textarea className="uk-textarea"></textarea>
                                    }
                                    
                                </div>
                            </article>
                        })
                    }
                </div>
                <div className="uk-card-footer">
                {
                        !isReview && <>
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
                    isReview && <div className="uk-margin uk-form-controls uk-align-center">
                        <button className="uk-button uk-button-primary uk-width-medium uk-align-center">Submit Feedback</button>
                    </div>
                }
                </div>
            </div>
        </div>
    );
}

export default MealSuggestionList;