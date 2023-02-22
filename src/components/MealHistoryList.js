import React from "react";
import './MealHistoryList.css';
import MealHistoryEntry from './MealHistoryEntry'

function MealHistory(props) {
    return (
            <ul className="uk-list uk-list-striped uk-list-large" uk-accordion="true">
                <li className="uk-open">
                    <a className="uk-accordion-title" href="./">Thursday, Jan 01</a>
                    <div className="uk-accordion-content">
                        <MealHistoryEntry/>
                    </div>
                </li>
                <li>
                    <a className="uk-accordion-title" href="./">Wednesday, Dec 31</a>
                    <div className="uk-accordion-content">
                        <MealHistoryEntry/>
                    </div>
                </li>
                <li>
                    <a className="uk-accordion-title" href="./">Tuesday, Dec 30</a>
                    <div className="uk-accordion-content">
                        <MealHistoryEntry/>
                    </div>
                </li>
                <li>
                    <a className="uk-accordion-title" href="./">Monday, Dec 29</a>
                    <div className="uk-accordion-content">
                        <MealHistoryEntry/>
                    </div>
                </li>
                <li>
                    <a className="uk-accordion-title" href="./">Sunday, Dec 28</a>
                    <div className="uk-accordion-content">
                        <MealHistoryEntry/>
                    </div>
                </li>
            </ul>
    );
}

export default MealHistory;