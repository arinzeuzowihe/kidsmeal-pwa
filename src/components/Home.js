import React from "react";
import MealHistoryList from "./MealHistoryList";
import './Home.css'

function Home(props) {
    
    return (
        <div className="overflow-content" id="home-container">
            <div className="uk-margin-small-top" uk-sticky="end: #home-container; offset: 80">
                <ul className="uk-flex-center" uk-tab="connect: #home-tab-content; animation: uk-animation-slide-left-medium uk-animation-slide-right-medium">
                    <li className="uk-width-medium uk-active"><a href="./"><img className="uk-border-circle" src="https://styles.redditmedia.com/t5_2sws5/styles/communityIcon_shz4ogqfbtw81.png" width="50" height="50" alt="" />Son</a></li>
                    <li className="uk-width-medium" ><a href="./"><img className="uk-border-circle" src="https://styles.redditmedia.com/t5_2sws5/styles/communityIcon_shz4ogqfbtw81.png" width="50" height="50" alt="" />Daughter</a></li>
                </ul>
            </div>
            <ul id="home-tab-content" className="uk-switcher uk-margin">
                <li>
                    <MealHistoryList/>
                </li>
                <li>
                    <MealHistoryList/>
                </li>
            </ul>
        </div>
    );
}

export default Home;