import React, { useState, useEffect } from 'react';
import { Outlet} from 'react-router-dom';
import './App.css';
import HamburgerMenu from './components/HamburgerMenu';
import Header from './components/Header';
import LoginForm from './components/LoginForm.js';
import 'react-toastify/dist/ReactToastify.css';
import AuthService from "./services/auth.service.ts";
import mainLogo from "./img/hand.png";
import './site.css'

function App(props) {
  const [isUserLoggedIn, setisUserLoggedIn] = useState(false);
  const authService = AuthService.getInstance();
  
  useEffect(() => {
    const userInfo = authService.getCurrentLoggedInUser();
    if (userInfo) {
      setisUserLoggedIn(true);
    }
  }, []);

  const leftNavBarContent = () => {
    return <>
      <HamburgerMenu onLogoutCompleted={() => setisUserLoggedIn(false)} />
    </>
  };

  const centerNavBarContent = () => {
    return <a className="uk-navbar-item uk-logo" href="/"><img src={mainLogo} width="50" height="50" /></a>
  }

  return (
    <div className="uk-height-viewport">
      {
        isUserLoggedIn && <>
          <Header
            center={centerNavBarContent()}
            right={leftNavBarContent()}
          />
          <div uk-grid="true">
            <div className="uk-width-1-6 uk-visible@m"></div>
            <div className="uk-width-expand">
              <Outlet />
            </div>
            <div className="uk-width-1-6 uk-visible@m"></div>
          </div>
        </>
      }      
      {
        !isUserLoggedIn && <LoginForm onLoginCompleted={(successfulLogin) => setisUserLoggedIn(successfulLogin)} />
      }
    </div>
  );
}

export default App;
