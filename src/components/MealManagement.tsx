import React, { useEffect, useState } from "react";
import UserService from "../services/user.service";
import MealService from "../services/meal.service";
import { useParams } from "react-router-dom";
import { BaseKid, BaseMeal, BasicMealPreference, DetailedMealPreference } from "../interfaces/api/responses";
import { MealType, SelectOptions } from "../interfaces/common.interfaces";
import Switch from "react-switch";
import './MealManagement.css';
import KidSelection from "./KidSelection";
import { useMediaQuery } from 'react-responsive'

function MealManagement() {
    const mealService = MealService.getInstance();
    const userService = UserService.getInstance();
    const kids = userService.getKids();
    const { id } = useParams(); //used url palceholders to validate replacing userService.getUserID()
    const [kidSelectionOptions, setKidSelectionOptions] = useState<SelectOptions[]>([]);
    const [selectedKidIds, setSelectedKidIds] = useState<number[]>([]);
    const [preferences, setPreferences] = useState<BasicMealPreference[]>([]);
    const [selectedPreference, setSelectedPreference] = useState<BasicMealPreference>();
    const [showInactivePreferences, setShowInactivePreferences] = useState<boolean>(false);
    const [selectedMealPrefrenceDetails, setSelectedMealPrefrenceDetails] = useState<DetailedMealPreference>({
        mealId: 0,
        mealName: '',
        mealDescription: '',
        mealTypes: [],
        isSideDish: false,
        isTakeout: false
    });
    const badgeClasses = "uk-badge uk-padding-small uk-margin-small-bottom uk-margin-small-left";
    const inactiveBadgeClass = "inactive-badge";
    const selectedBadgeClass = "selected-badge";
    const [isFormDisabled, setIsFormDisabled] = useState<boolean>(true);

    useEffect(() => {
        const clearPreferenceSelection = () => {
            if (selectedPreference) {
                setSelectedPreference(undefined);
            }
        };

        clearPreferenceSelection();
        toggleFormDisabledState();
        loadPreferencesAysnc();
        
    }, [selectedKidIds]);

    useEffect(() => {
        loadPreferencesAysnc();
    }, [showInactivePreferences]);

    useEffect(() => {
        const loadPreferenceDetailsAsync = async () => {
            if (!selectedPreference) {
                //Clear previsouly selected details
                setSelectedMealPrefrenceDetails({
                    mealId: 0,
                    mealName: '',
                    mealDescription: '',
                    mealTypes: [],
                    isSideDish: false,
                    isTakeout: false
                })
                return;
            }

            if (selectedKidIds.length > 0) {
                var response = await mealService.getPreferredMealDetails(selectedPreference.mealId, selectedKidIds);
                setSelectedMealPrefrenceDetails(response);
            }

            refreshDisplayedPreferences();
            toggleFormDisabledState();
        };

        loadPreferenceDetailsAsync();
        
    }, [selectedPreference]);

    useEffect(() => {
        //Make sure the correct meal preference is always selected
        //if details are being displayed after a reload of preferences
        var mealId = selectedMealPrefrenceDetails?.mealId;
        if (mealId === 0) {
            var mealName = selectedMealPrefrenceDetails?.mealName;
            if (!mealName) {
                return; //details have no mealId and no meal name thus nothing to select 
            }

            const preferencesToSelect = preferences.find(p => p.mealName === mealName);
            setSelectedPreference(preferencesToSelect);
            return;
        }

        if (mealId === selectedPreference?.mealId) {
            return; //details displayed are for the currently selected preference
        }

        const preferencesToSelect = preferences.find(p => p.mealId === mealId);
        setSelectedPreference(preferencesToSelect); 

    }, [preferences])

    const loadKidSelectionOptions = (kids: BaseKid[]) => {

        if (kidSelectionOptions.length > 0) {
            return;
        }

        let selectOptions: SelectOptions[] = [{ value: '0', text: '--Choose an option--', disabled: true }];
        const kidOptions = kids.map((kid: BaseKid, index) => {
                                                                return {
                                                                    value: kid.id.toString(),
                                                                    text: kid.name
                                                                }
                                                            });
                                                    
        selectOptions.push(...kidOptions);

        if (kids.length > 1) {
            selectOptions.push({ value: 'all', text: 'All Kids' });
        }

        setKidSelectionOptions([...selectOptions]);
    };

    const handleKidSelectionChange = (selectedKidIds: number[]) => {
        setSelectedKidIds(selectedKidIds);
    }

    const loadPreferencesAysnc = async () => {
        if (selectedKidIds.length > 0) {
            var updatedPreferences = await mealService.getCommonMealPreferencesAsync(selectedKidIds, !showInactivePreferences);
            setPreferences(updatedPreferences);
        }
    }

    const toggleFormDisabledState = () => {
        const isInactivePreferenceSelected = (selectedPreference && !selectedPreference.isActive) ?? false;
        const hasKidOptionBeenSelected = (selectedKidIds.length > 0);
        setIsFormDisabled(!hasKidOptionBeenSelected || isInactivePreferenceSelected);
    };


    const refreshDisplayedPreferences = () => {
        if (!selectedPreference) {
            return;
        }
        const displayedPreference = preferences.find(p => p.mealId === selectedPreference.mealId);
        if (!displayedPreference) {
            return;
        }
        
        //Check is displayed preference needs to be updated
        if (displayedPreference.mealName !== selectedPreference.mealName || displayedPreference.isActive !== selectedPreference.isActive) {

            let updatedPreferences = [...preferences.filter(p => p.mealId !== selectedPreference.mealId)];
            let isSelectedPreferenceVisible = false;
            if (selectedPreference.isActive || (!selectedPreference.isActive && showInactivePreferences)) {
                updatedPreferences = [...updatedPreferences, selectedPreference];
                isSelectedPreferenceVisible = true;
            }
            setPreferences(() => { return updatedPreferences });

            if (!isSelectedPreferenceVisible) {
                setSelectedPreference(() => { return undefined });
            }
        }
    };

    const handleMealPreferenceSelection = async (preference: BasicMealPreference) => {
        if (!preference) {
            setSelectedPreference(undefined);
            return;
        }

        setSelectedPreference(preference);
    };

    const handleShowInactivePreferencesToggleAsync = async (checked: boolean) => {
        setShowInactivePreferences(checked );
    };

    const handleDetailChanges = (evt:any) => {
        if (!evt?.target) {
            return;
        }

        const value = evt.target.value;
        if (evt.target.type === "checkbox") {
            const isChecked = evt.target.checked 
            //update mealtypes
            if (evt.target.name === "mealTypes") {
                const mealType: number = parseInt(value, 10);
                setSelectedMealPrefrenceDetails({
                    ...selectedMealPrefrenceDetails,
                    mealTypes: isChecked ? [...selectedMealPrefrenceDetails.mealTypes, mealType] : selectedMealPrefrenceDetails.mealTypes.filter(mt => mt !== mealType)
                });
            }
            else {
                //update other checkbox driven properties
                setSelectedMealPrefrenceDetails({
                    ...selectedMealPrefrenceDetails,
                    [evt.target.name]: isChecked
                });
            }
        }
        else {
            //update any other non-checkbox driven properties
            setSelectedMealPrefrenceDetails({
                ...selectedMealPrefrenceDetails,
                [evt.target.name]: value
            });
        }
    }

    const handleRemoveMealPreference = async (preference: BasicMealPreference) => {
        if (selectedKidIds.length > 0) {
            var response = await mealService.removeMealPreferenceAsync(preference.mealId, selectedKidIds);
            if (selectedPreference) {
                setSelectedPreference({ ...selectedPreference, isActive: false });   
            }
            else if (preferences) {
                let updatedPreferences = [...preferences.filter(p => p.mealId !== preference.mealId)];
                if (showInactivePreferences)
                    updatedPreferences = [...updatedPreferences, { ...preference, isActive: false }];
                setPreferences(updatedPreferences);
            }
        }
    };

    const handleAddMealPreference = async () => {
        if (selectedKidIds.length > 0) {
            var response = await mealService.addMealPreferenceAsync(selectedKidIds, selectedMealPrefrenceDetails);
            await loadPreferencesAysnc();
        }
    };

    const handleUpdateMealPreference = async () => {
        if (selectedKidIds.length > 0 && selectedPreference) {
            var response = await mealService.updateMealPreferenceAsync(selectedKidIds, selectedMealPrefrenceDetails, selectedPreference.isActive);
            setSelectedPreference({ ...selectedPreference, mealName: selectedMealPrefrenceDetails.mealName }); 
        }
    };

    const handleRestoreMealPreference = async () => {
        if (selectedKidIds.length > 0) {
            var response = await mealService.restoreMealPreferenceAsync(selectedKidIds, selectedMealPrefrenceDetails);
            if (selectedPreference) {
                setSelectedPreference({ ...selectedPreference, isActive: true });   
            }
        }
    };

    const handleCancelUserAction = () => {
        if (selectedPreference) {
            setSelectedPreference(undefined);   
        }
    };

    return (
        <div className={ useMediaQuery({ query: '(min-width: 768px)'}) ? "uk-position-center" : "" }>
            <div className="uk-card uk-card-default uk-width-xlarge uk-margin-small-top">
                <div className="uk-card-header">
                    <KidSelection kids={kids} onSelectionChange={handleKidSelectionChange}/>
                </div>
                <div className="uk-card-body">
                    <div className="uk-align-left">
                        {
                            preferences?.filter(p => p.isActive).map((preference: BasicMealPreference, index) => {
                                return <a key={index} className={ selectedMealPrefrenceDetails?.mealId === preference.mealId ? `${badgeClasses} ${selectedBadgeClass}` : badgeClasses}>
                                            <span onClick={() => handleMealPreferenceSelection(preference)}>{preference.mealName}&nbsp;</span>
                                            <button onClick={() => handleRemoveMealPreference(preference)} type="button" aria-label="Close" uk-close="true">
                                            </button>
                                        </a>
                            })
                        }
                        {
                            preferences?.filter(p => !p.isActive).map((preference: BasicMealPreference, index) => {
                                return <a key={index} className={ selectedMealPrefrenceDetails?.mealId === preference.mealId ? `${badgeClasses} ${inactiveBadgeClass} ${selectedBadgeClass}` : `${badgeClasses} ${inactiveBadgeClass}`}>
                                            <span onClick={() => handleMealPreferenceSelection(preference)}>{preference.mealName}&nbsp;</span>
                                        </a>
                            })
                        }
                    </div>
                    <div className="uk-align-right">
                        <label>
                            <span>Include Inactive</span>
                            <Switch onChange={handleShowInactivePreferencesToggleAsync}
                                checked={showInactivePreferences}
                                className="react-switch"
                                checkedIcon={false}
                                uncheckedIcon={false}
                                onColor="#ff7f50"/>
                        </label>
                    </div>
                </div>
                <div className="uk-card-footer">
                    <form className="uk-form-stacked">
                        <div className="uk-margin uk-form-controls">
                            <input name="mealName"
                                className="uk-input"
                                type="text"
                                placeholder="Name of Meal"
                                value={selectedMealPrefrenceDetails?.mealName}
                                onChange={handleDetailChanges}
                                disabled={isFormDisabled} />
                        </div>
                        <div className="uk-margin uk-form-controls">
                            <textarea name="mealDescription"
                                className="uk-textarea"
                                rows={3}
                                placeholder="Description"
                                value={selectedMealPrefrenceDetails?.mealDescription}
                                onChange={handleDetailChanges}
                                disabled={isFormDisabled} />
                        </div>
                        <div className="uk-margin uk-form-controls">
                            <div className="uk-child-width-1-4" uk-grid="true">
                                <label>
                                    <input name="mealTypes"
                                        className="uk-checkbox uk-margin-small-right"
                                        type="checkbox"
                                        onChange={handleDetailChanges}
                                        value={MealType.Breakfast}
                                        checked={selectedMealPrefrenceDetails?.mealTypes.some(mt => mt === MealType.Breakfast)}
                                        disabled={isFormDisabled} />
                                    Breakfast
                                </label>
                                <label>
                                    <input name="mealTypes"
                                        className="uk-checkbox uk-margin-small-right"
                                        type="checkbox"
                                        onChange={handleDetailChanges}
                                        value={MealType.Lunch}
                                        checked={selectedMealPrefrenceDetails?.mealTypes.some(mt => mt === MealType.Lunch)}
                                        disabled={isFormDisabled}/>
                                    Lunch
                                </label>
                                <label>
                                    <input name="mealTypes"
                                        className="uk-checkbox uk-margin-small-right"
                                        type="checkbox"
                                        onChange={handleDetailChanges}
                                        value={MealType.Snack}
                                        checked={selectedMealPrefrenceDetails?.mealTypes.some(mt => mt === MealType.Snack)}
                                        disabled={isFormDisabled}/>
                                    Snack
                                </label>
                                <label>
                                    <input name="mealTypes"
                                        className="uk-checkbox uk-margin-small-right"
                                        type="checkbox"
                                        onChange={handleDetailChanges}
                                        value={MealType.Dinner}
                                        checked={selectedMealPrefrenceDetails?.mealTypes.some(mt => mt === MealType.Dinner)}
                                        disabled={isFormDisabled}/>
                                    Dinner
                                </label>
                                <label>
                                    <input name="isTakeout"
                                        className="uk-checkbox uk-margin-small-right"
                                        type="checkbox"
                                        onChange={handleDetailChanges}
                                        checked={selectedMealPrefrenceDetails?.isTakeout}
                                        disabled={isFormDisabled}/>
                                    Takeout?
                                </label>
                                <label>
                                    <input name="isSideDish"
                                        className="uk-checkbox uk-margin-small-right"
                                        type="checkbox"
                                        onChange={handleDetailChanges}
                                        checked={selectedMealPrefrenceDetails?.isSideDish}
                                        disabled={isFormDisabled}/>
                                    Side?
                                </label>
                            </div>
                        </div>
                        {
                            !selectedPreference && <div className="uk-margin uk-form-controls">
                                <button type="button" className="uk-button uk-button-default uk-width-small uk-align-left"
                                        onClick={handleCancelUserAction}>Cancel</button>
                                <button type="button" className="uk-button uk-button-primary uk-width-small uk-align-right"
                                        onClick={handleAddMealPreference} disabled={isFormDisabled}>Add</button>
                            </div>
                        }
                        {
                            selectedPreference && <div className="uk-margin uk-form-controls">
                                <button type="button" className="uk-button uk-button-default uk-width-small uk-align-left" onClick={handleCancelUserAction}>Cancel</button>
                                {
                                    selectedPreference.isActive && <button type="button" className="uk-button uk-button-primary uk-width-small uk-align-right"
                                                                           onClick={handleUpdateMealPreference}>Update</button>   
                                }
                                {
                                    !selectedPreference.isActive && <button type="button" className="uk-button uk-button-primary uk-width-small uk-align-right"
                                                                            onClick={handleRestoreMealPreference}>Restore</button>
                                }
                            </div>
                        }
                    </form>
                </div>
            </div>
        </div>
    );
}

export default MealManagement;