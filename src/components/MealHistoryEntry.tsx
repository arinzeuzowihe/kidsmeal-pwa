import React from "react";
import { MealHistory } from "../interfaces/api/responses";

interface MealHistoryEntryProp {
    histories: MealHistory[];
}

function MealHistoryEntry(props: MealHistoryEntryProp) {
    return (
        props.histories && <div>
            {
                props.histories.map((history, index) => (
                    <div key={index} className="uk-grid-small" uk-grid="true">
                        <div className="uk-width-small">
                            <div className="uk-align-right">{history.mealType}:</div>
                        </div>
                        <div className="uk-width-expand">
                            <p>{history.mealName} - {history.mealDescription}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}


export default MealHistoryEntry;