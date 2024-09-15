import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AuthService from "../services/auth.service.ts";
import Spinner from "./Spinner";
import mainLogo from "../img/hand.png";


function LoginForm({ onLoginCompleted }) {

    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const authService = AuthService.getInstance();

    const handleLoginAsync = async () => {
        setIsLoading(true);

        setLoginError('');

        //Make API call
        const response = await authService.loginAsync({ username, password });

        const userInfo = response.wasSuccessful ? { userId: response.userID, username: response.username ?? username } : undefined;
        if (!response.wasSuccessful) {
            setLoginError(response.errorMessage);
        }
        onLoginCompleted(response.wasSuccessful);

        setIsLoading(false);
    };

    return (
        <div className="uk-position-center">
            {
                isLoading
                    ? <Spinner ratio="5" text="Logging In..."/>
                    : <>
                        <div className="uk-section-small uk-section-muted uk-border-rounded">
                            <div className="uk-container uk-margin-medium-bottom">
                                <div uk-grid="true">
                                    <div className="uk-width-expand">
                                    <h3>Welcome to Steady Spoon</h3>
                                        Feed your kid with confidence and not fear!
                                    </div>
                                    <div className="uk-width-1-4">
                                    <img src={mainLogo} alt="logo" width="50" height="50"/>
                                    </div>
                                </div>
                            </div>
                            <div className="uk-container">
                                {
                                    loginError && <div className="uk-align-center uk-text-danger uk-margin-bottom-small">{loginError}</div>
                                }
                                <form className="uk-form-stacked">
                                    <div className="uk-margin-small">
                                        <div className="uk-inline">
                                            <span className="uk-form-icon" uk-icon="icon: mail"></span>
                                            <input className="uk-input uk-form-width-large"
                                                type="text"
                                                placeholder="Email Address"
                                                value={username}
                                                onChange={(event) => setUsername(event.target.value)} />
                                        </div>
                                    </div>
                                    <div className="uk-margin-small">
                                        <div className="uk-inline">
                                            <span className="uk-form-icon" uk-icon="icon: lock"></span>
                                            <input className="uk-input uk-form-width-large"
                                                type="password"
                                                placeholder="Password"
                                                value={password}
                                                onChange={(event) => setPassword(event.target.value)} />
                                        </div>
                                    </div>
                                    <div className="uk-margin-small uk-margin-medium-top">
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