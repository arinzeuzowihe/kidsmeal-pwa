import React from "react";

function MealQuestionaire() {
    return (
        <div className="uk-section-small uk-section-muted uk-border-rounded uk-position-center">
            <div className="uk-container">
                <form className="uk-form uk-width-large">
                    <ul className="uk-list uk-list-large uk-list-divider">
                        <li>
                            <div className="uk-text-large uk-text-bold">1. Who will be eating this next meal?</div>
                            <div className="uk-margin uk-form-controls">
                                <select className="uk-select">
                                    <option>Arinze jr.</option>
                                    <option>Kelenna</option>
                                    <option>Both Kids</option>
                                </select>
                            </div>
                        </li>
                        <li>
                            <div className="uk-text-large uk-text-bold">2. What type of meal is the next meal?</div>
                            <div className="uk-margin uk-form-controls uk-form-controls-text">
                                <div className="uk-margin-small-bottom">
                                    <label><input className="uk-radio" type="radio" name="mealType" /> Breakfast</label>
                                </div>
                                <div className="uk-margin-small-bottom">
                                    <label><input className="uk-radio" type="radio" name="mealType" /> Lunch</label>
                                </div>
                                <div className="uk-margin-small-bottom">
                                    <label><input className="uk-radio" type="radio" name="mealType" /> Snack</label>
                                </div>
                                <div className="uk-margin-small-bottom">
                                    <label><input className="uk-radio" type="radio" name="mealType" /> Dinner</label>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="uk-text-large uk-text-bold">3. Are you open to ordering takeout?</div>
                            <div className="uk-margin uk-form-controls uk-form-controls-text">
                                <div className="uk-margin-small-bottom">
                                    <label><input className="uk-radio" type="radio" name="takeout" /> Yes</label>
                                </div>
                                <div className="uk-margin-small-bottom">
                                    <label><input className="uk-radio" type="radio" name="takeout" /> No</label>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div className="uk-margin-medium">
                        <button className="uk-button uk-button-primary uk-width-expand">SUGGEST MEAL</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default MealQuestionaire;