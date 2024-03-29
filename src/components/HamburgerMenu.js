import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthService from "../services/auth.service.ts";
import UserService from "../services/user.service.ts";

function HamburgerMenu({ onLogoutCompleted }) {
    const userService = UserService.getInstance();
    const authService = AuthService.getInstance();
    const userId = userService.getUserID();

    const handleLogout = () => {
        authService.logoutAsync();
        onLogoutCompleted();
    }

    return (
        <div className="uk-margin-medium-left uk-margin-medium-right">
            {
            // eslint-disable-next-line 
            <a className="uk-navbar-toggle uk-navbar-toggle-animate" uk-navbar-toggle-icon="true" href=""></a>
            }
            <div className="uk-navbar-dropdown">
                <ul className="uk-nav uk-nav-dropdown-nav">
                    <li className="uk-active"><Link to="/">Home</Link></li>
                    <li><Link to="/nextmeal">Next Meal</Link></li>
                    <li><Link to={`/meals/${userId}`}>Meals</Link></li>
                    <li><Link onClick={handleLogout}>Logout</Link></li>
                </ul>
            </div>
        </div>
    );
}

export default HamburgerMenu;