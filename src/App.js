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
  const [username, setUsername] = useState('');
  const authService = AuthService.getInstance();
  
  const updateLoginStatus = (isLoggedIn, userInfo) => {
    setUsername(userInfo?.username ?? '');
    setisUserLoggedIn(isLoggedIn);
  };

  useEffect(() => {
    const userInfo = authService.getCurrentLoggedInUser();
    if (userInfo) {
      updateLoginStatus(true, userInfo);
    }
  }, []);

  const leftNavBarContent = () => {
    return <>
      <HamburgerMenu onLogoutCompleted={() => updateLoginStatus(false, undefined)} />
    </>
  };

  const centerNavBarContent = () => {
    return <a className="uk-navbar-item uk-logo" href="./"><img src={mainLogo} width="50" height="50" /></a>
  }

  const rightNavBarContent = () => {
    return <div className="uk-navbar-item uk-text-large"> Hi {username}</div>
  }

  return (
    <div className="uk-height-viewport">
      {
        isUserLoggedIn && <>
          <Header
            left={rightNavBarContent()}
            center={centerNavBarContent()}
            right={leftNavBarContent()}
          />
          <div uk-grid="true">
            <div className="uk-width-1-6"></div>
            <div className="uk-width-expand">
              <Outlet />
            </div>
            <div className="uk-width-1-6"></div>
          </div>
        </>
      }      
      {
        !isUserLoggedIn && <LoginForm onLoginCompleted={updateLoginStatus} />
      }
    </div>
  );
}

export default App;
