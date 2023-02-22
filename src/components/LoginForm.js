import React, { useState } from "react";
import PropTypes from "prop-types";
import AuthService from "../services/auth.service.ts";
import Spinner from "./Spinner";


function LoginForm({ onLoginCompleted }) {

    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginAsync = async () => {
        setIsLoading(true);

        //Make API call
        var authService = AuthService.getInstance();
        const response = await authService.loginAsync({ username, password });

        const userInfo = response.wasSuccessful ? { userId: response.userID, username } : undefined;
        onLoginCompleted(response.wasSuccessful, userInfo);

        setIsLoading(false);
    };

    return (
        <div className="uk-position-center">
            {
                isLoading
                    ? <Spinner ratio="5" text="Logging In..."/>
                    : <>
                        <div className="uk-container uk-margin-small-bottom">
                            <img className="uk-align-center uk-border-circle" width="250" height="250" uk-svg="true" alt="homepage icon" src="https://pbs.twimg.com/profile_images/1024304482207911937/VW4zbXw__400x400.jpg"/>
                        </div>
                        <div className="uk-section-small uk-section-muted uk-border-rounded">
                            <div className="uk-container">
                                <form className="uk-form-stacked">
                                    <div className="uk-margin-small">
                                        <div className="uk-inline">
                                            <span className="uk-form-icon" uk-icon="icon: mail"></span>
                                            <input className="uk-input uk-form-width-large"
                                                type="text"
                                                placeholder="Email Address"
                                                onChange={(event) => setUsername(event.target.value)} />
                                        </div>
                                    </div>
                                    <div className="uk-margin-small">
                                        <div className="uk-inline">
                                            <span className="uk-form-icon" uk-icon="icon: lock"></span>
                                            <input className="uk-input uk-form-width-large"
                                                type="password"
                                                placeholder="Password"
                                                onChange={(event) => setPassword(event.target.value)} />
                                        </div>
                                    </div>
                                    <div className="uk-margin-small">
                                        <button className="uk-button uk-button-primary uk-width-expand"
                                            onClick={handleLoginAsync}>LOGIN</button>
                                    </div>
                                </form>
                            </div>
                        </div>       
                    </>
            }
        </div>
    );
}

LoginForm.propTypes = {
    onLoginClick: PropTypes.func
}

export default LoginForm;