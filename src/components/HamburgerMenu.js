import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from '../components/Header';
import AuthService from "../services/auth.service.ts";
import UserService from "../services/user.service.ts";

function HamburgerMenu({ onLogoutCompleted }) {
    const userService = UserService.getInstance();
    const authService = AuthService.getInstance();
    const userId = userService.getUserID();
    const [currentUserInfo, setCurrentUserInfo] = useState();

    useEffect(() => {
        const userInfo = authService.getCurrentLoggedInUser();
        if (userInfo) {
            setCurrentUserInfo(userInfo);
        }
      }, []);

    const handleLogout = () => {
        authService.logoutAsync();
        onLogoutCompleted();
    }
    
    return (
        <div>
            <a className="uk-navbar-toggle" uk-navbar-toggle-icon="true" href="" uk-toggle="target: #offcanvas-main"></a>
            <div id="offcanvas-main" uk-offcanvas="overlay: true">
                <div className="uk-offcanvas-bar">
                    <button className="uk-offcanvas-close" type="button" uk-close="true"></button>
                    <div>
                        <h2>Hi {currentUserInfo?.username}</h2>
                    </div>
                    <div>
                        <ul className="uk-nav uk-nav-default">
                        <li className="uk-nav-divider"></li>
                            <li className="uk-text-large">                             
                                <Link uk-toggle="target: #offcanvas-main" to="/">
                                    <span className="uk-icon" uk-icon="home"></span>Home
                                </Link> 
                            </li>
                            <li className="uk-nav-divider"></li>
                            <li className="uk-text-large">
                                <Link uk-toggle="target: #offcanvas-main" to="/nextmeal">
                                    <span className="uk-icon" uk-icon="calendar"></span>Next Meal
                                </Link>
                            </li>
                            <li className="uk-nav-divider"></li>
                            <li className="uk-text-large">
                                <Link uk-toggle="target: #offcanvas-main" to={`/meals/${userId}`}>
                                    <span className="uk-icon" uk-icon="star"></span>Meals
                                </Link>
                            </li>
                            <li className="uk-nav-divider"></li>
                            <li className="uk-text-large">
                                <Link uk-toggle="target: #offcanvas-main" onClick={handleLogout}>
                                    <span className="uk-icon" uk-icon="sign-out"></span>Sign Out
                                </Link>
                            </li>
                            <li className="uk-nav-divider"></li>
                    </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HamburgerMenu;