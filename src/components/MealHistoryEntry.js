import React from "react";

function MealHistoryEntry(props) {
    return (
        <div>
            <div className="uk-grid-small" uk-grid="true">
                <div className="uk-width-small">
                    <div className="uk-align-right">Breakfast:</div>
                </div>
                <div className="uk-width-expand">
                    <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor reprehenderit.</p>
                </div>
            </div>
            <div className="uk-grid-small" uk-grid="true">
                <div className="uk-width-small">
                    <div className="uk-align-right">Lunch:</div>
                </div>
                <div className="uk-width-expand">
                    <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor reprehenderit.</p>
                </div>
            </div>
            <div className="uk-grid-small" uk-grid="true">
                <div className="uk-width-small">
                    <div className="uk-align-right">Dinner:</div>
                </div>
                <div className="uk-width-expand">
                    <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor reprehenderit.</p>
                </div>
            </div>
        </div>
    );
}

export default MealHistoryEntry;