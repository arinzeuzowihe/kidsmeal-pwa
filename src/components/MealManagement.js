import React from "react";

function MealManagement(props) {
    return (
        <div className="uk-position-center">
            <div className="uk-card uk-card-default uk-width-xlarge">
                <div className="uk-card-header">
                    <select className="uk-select">
                        <option>Arinze jr.</option>
                        <option>Kelenna</option>
                        <option>Both Kids</option>
                    </select>
                </div>
                <div className="uk-card-body">
                    <div className="uk-align-let">
                        <a href="./" className="uk-badge uk-padding-small uk-margin-small-bottom uk-margin-small-left">hshshshshshs&nbsp;<button type="button" aria-label="Close" uk-close="true"></button></a>
                        <a href="./" className="uk-badge uk-padding-small uk-margin-small-bottom uk-margin-small-left">ghghghghgh&nbsp;<button type="button" aria-label="Close" uk-close="true"></button></a>
                        <a href="./" className="uk-badge uk-padding-small uk-margin-small-bottom uk-margin-small-left">hshshshshshs&nbsp;<button type="button" aria-label="Close" uk-close="true"></button></a>
                        <a href="./" className="uk-badge uk-padding-small uk-margin-small-bottom uk-margin-small-left">ghghghghgh&nbsp;<button type="button" aria-label="Close" uk-close="true"></button></a>
                        <a href="./" className="uk-badge uk-padding-small uk-margin-small-bottom uk-margin-small-left">hshshshshshs&nbsp;<button type="button" aria-label="Close" uk-close="true"></button></a>
                        <a href="./" className="uk-badge uk-padding-small uk-margin-small-bottom uk-margin-small-left">ghghghghgh&nbsp;<button type="button" aria-label="Close" uk-close="true"></button></a>
                        <a href="./" className="uk-badge uk-padding-small uk-margin-small-bottom uk-margin-small-left">hshshshshshs&nbsp;<button type="button" aria-label="Close" uk-close="true"></button></a>
                        <a href="./" className="uk-badge uk-padding-small uk-margin-small-bottom uk-margin-small-left">ghghghghgh&nbsp;<button type="button" aria-label="Close" uk-close="true"></button></a>
                    </div>
                </div>
                <div className="uk-card-footer">
                    <form className="uk-form-stacked">
                        <div className="uk-margin uk-form-controls">
                            <input className="uk-input" type="text" placeholder="Name of Meal"/>
                        </div>
                        <div className="uk-margin uk-form-controls">
                            <div className="uk-child-width-1-4" uk-grid="true">
                                    <label><input className="uk-checkbox" type="checkbox" />&nbsp;Breakfast</label>
                                    <label><input className="uk-checkbox" type="checkbox" />&nbsp;Lunch</label>
                                    <label><input className="uk-checkbox" type="checkbox" />&nbsp;Snack</label>
                                    <label><input className="uk-checkbox" type="checkbox" />&nbsp;Dinner</label>
                                    <label><input className="uk-checkbox" type="checkbox" />&nbsp;Takeout?</label>
                                    <label><input className="uk-checkbox" type="checkbox" />&nbsp;Side?</label>
                            </div>
                        </div>
                        <div className="uk-margin uk-form-controls">
                            <button className="uk-button uk-button-primary uk-width-medium uk-align-center">Add Meal</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default MealManagement;