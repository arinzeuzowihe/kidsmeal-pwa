import React, { useEffect, useState } from "react";
import UserService from "../services/user.service";
import MealService from "../services/meal.service";
import { useParams } from "react-router-dom";
import { BaseKid, BaseMeal, BasicMealPreference, DetailedMealPreference } from "../interfaces/api/responses";
import { MealType, SelectOptions } from "../interfaces/common.interfaces";
import Switch from "react-switch";
import './MealManagement.css';

function MealManagement() {
    const mealService = MealService.getInstance();
    const userService = UserService.getInstance();
    const kids = userService.getKids();
    const { id } = useParams(); //used url palceholders to validate replacing userService.getUserID()
    const [kidSelectionOptions, setKidSelectionOptions] = useState<SelectOptions[]>([]);
    const [selectedKidOption, setSelectedKidOption] = useState('0');
    const [preferences, setPreferences] = useState<BasicMealPreference[]>([]);
    const [selectedPreference, setSelectedPreference] = useState<BasicMealPreference>();
    const [showInactivePreferences, setShowInactivePreferences] = useState<boolean>(false);
    const [selectedMealPrefrenceDetails, setSelectedMealPrefrenceDetails] = useState<DetailedMealPreference>({
        mealId: 0,
        mealName: '',
        mealDescription: '',
        mealTypes: [],
        isSide: false,
        isTakeout: false
    });
    const badgeClasses = "uk-badge uk-padding-small uk-margin-small-bottom uk-margin-small-left";
    const inactiveBadgeClass = "inactive-badge";
    const selectedBadgeClass = "selected-badge";


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

    const handleKidSelectionChangeAsync = async (event: any) => {
        const selectedKidOptionValue = event.target.value;
        setSelectedKidOption(selectedKidOptionValue);
    };

    const loadPreferencesAysnc = async () => {
        var kidIds = getKidIds();
        if (kidIds.length > 0) {
            var response = await mealService.getCommonMealPreferencesAsync(kidIds, !showInactivePreferences);
            setPreferences(response);
        }
    }

    const handleMealPreferenceSelection = async (preference: BasicMealPreference) => {
        if (!preference) {
            setSelectedPreference(undefined);
            return;
        }

        setSelectedPreference(preference);

        var kidIds = getKidIds();
        if (kidIds.length > 0) {
            var response = await mealService.getPreferredMealDetails(preference.mealId, kidIds);
            setSelectedMealPrefrenceDetails(response);
        }
    };

    const handleMealPreferenceRemoval = (preference: BasicMealPreference) => {
        console.log(preference);
    };

    const handleShowInactivePreferencesToggleAsync = async (checked: boolean) => {
        setShowInactivePreferences(checked );
    };

    function getKidIds(): number[] {
        var kidIds: number[] = [];
        if (selectedKidOption === '0') {
            return kidIds;
        }

        if (selectedKidOption === 'all') {
            kidIds = kids.map((kid, index) => {
                return kid.id;
            })
        }
        else {
            const kidId = parseInt(selectedKidOption, 10);
            kidIds.push(kidId);
        }

        return kidIds;
    }

    useEffect(() => {
        loadKidSelectionOptions(kids);
    }, []);

    useEffect(() => {
        loadPreferencesAysnc();
    }, [selectedKidOption, showInactivePreferences]);

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

    return (
        <div className="uk-position-center">
            <div className="uk-card uk-card-default uk-width-xlarge">
                <div className="uk-card-header">
                    <select className="uk-select" value={selectedKidOption} onChange={handleKidSelectionChangeAsync}>
                        {
                            kidSelectionOptions.map(kidOption => (
                                <option
                                    disabled={kidOption.disabled}
                                    key={kidOption.value}
                                    value={kidOption.value}
                                >
                                    {kidOption.text}
                                </option>
                            ))
                        }
                    </select>
                </div>
                <div className="uk-card-body">
                    <div className="uk-align-left">
                        {
                            preferences.filter(p => p.isActive).map((preference: BasicMealPreference, index) => {
                                return <a key={index} className={ selectedMealPrefrenceDetails?.mealId === preference.mealId ? `${badgeClasses} ${selectedBadgeClass}` : badgeClasses}>
                                            <span onClick={() => handleMealPreferenceSelection(preference)}>{preference.mealName}&nbsp;</span>
                                            <button onClick={() => handleMealPreferenceRemoval(preference)} type="button" aria-label="Close" uk-close="true">
                                            </button>
                                        </a>
                            })
                        }
                        {
                            preferences.filter(p => !p.isActive).map((preference: BasicMealPreference, index) => {
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
                                onChange={handleDetailChanges} />
                        </div>
                        <div className="uk-margin uk-form-controls">
                            <textarea name="mealDescription"
                                className="uk-textarea"
                                rows={3}
                                placeholder="Description"
                                value={selectedMealPrefrenceDetails?.mealDescription}
                                onChange={handleDetailChanges} />
                        </div>
                        <div className="uk-margin uk-form-controls">
                            <div className="uk-child-width-1-4" uk-grid="true">
                                <label>
                                    <input name="mealTypes"
                                        className="uk-checkbox uk-margin-small-right"
                                        type="checkbox"
                                        onChange={handleDetailChanges}
                                        value={MealType.Breakfast}
                                        checked={selectedMealPrefrenceDetails?.mealTypes.some(mt => mt === MealType.Breakfast)} />
                                    Breakfast
                                </label>
                                <label>
                                    <input name="mealTypes"
                                        className="uk-checkbox uk-margin-small-right"
                                        type="checkbox"
                                        onChange={handleDetailChanges}
                                        value={MealType.Lunch}
                                        checked={selectedMealPrefrenceDetails?.mealTypes.some(mt => mt === MealType.Lunch)} />
                                    Lunch
                                </label>
                                <label>
                                    <input name="mealTypes"
                                        className="uk-checkbox uk-margin-small-right"
                                        type="checkbox"
                                        onChange={handleDetailChanges}
                                        value={MealType.Snack}
                                        checked={selectedMealPrefrenceDetails?.mealTypes.some(mt => mt === MealType.Snack)} />
                                    Snack
                                </label>
                                <label>
                                    <input name="mealTypes"
                                        className="uk-checkbox uk-margin-small-right"
                                        type="checkbox"
                                        onChange={handleDetailChanges}
                                        value={MealType.Dinner}
                                        checked={selectedMealPrefrenceDetails?.mealTypes.some(mt => mt === MealType.Dinner)} />
                                    Dinner
                                </label>
                                <label>
                                    <input name="isTakeout"
                                        className="uk-checkbox uk-margin-small-right"
                                        type="checkbox"
                                        onChange={handleDetailChanges}
                                        checked={selectedMealPrefrenceDetails?.isTakeout} />
                                    Takeout?
                                </label>
                                <label>
                                    <input name="isSide"
                                        className="uk-checkbox uk-margin-small-right"
                                        type="checkbox"
                                        onChange={handleDetailChanges}
                                        checked={selectedMealPrefrenceDetails?.isSide} />
                                    Side?
                                </label>
                            </div>
                        </div>
                        {
                            !selectedPreference && <div className="uk-margin uk-form-controls">
                                <button className="uk-button uk-button-default uk-width-small uk-align-left">Cancel</button>
                                <button className="uk-button uk-button-primary uk-width-small uk-align-right">Add</button>
                            </div>
                        }
                        {
                            selectedPreference && <div className="uk-margin uk-form-controls">
                                <button className="uk-button uk-button-default uk-width-small uk-align-left">Cancel</button>
                                {
                                    selectedPreference.isActive && <button className="uk-button uk-button-primary uk-width-small uk-align-right">Update</button>   
                                }
                                {
                                    !selectedPreference.isActive && <button className="uk-button uk-button-primary uk-width-small uk-align-right">Restore</button>
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