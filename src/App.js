import React, { useState } from 'react';
import { Outlet} from 'react-router-dom';
import './App.css';
import HamburgerMenu from './components/HamburgerMenu';
import Header from './components/Header';
import LoginForm from './components/LoginForm.js';

function App(props) {
  const [isUserLoggedIn, setisUserLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  
  const updateLoginStatus = (isLoggedIn, userInfo) => {
    setUsername(userInfo?.username ?? '');
    setisUserLoggedIn(isLoggedIn);
  }

  return (      
    <div className="uk-height-viewport">
      <Header
        left={
            <a className="uk-navbar-item uk-logo" href="./">LOGO</a>
        }
        right={
          isUserLoggedIn &&
          <>
            <div className="uk-navbar-item"> Howdy {username},</div>
            <HamburgerMenu onLogoutCompleted={() => updateLoginStatus(false, undefined)} /> 
          </>
        }
      />
      {
        !isUserLoggedIn
          ? <LoginForm onLoginCompleted={updateLoginStatus}/> 
          : <div uk-grid="true">
              <div className="uk-width-1-6"></div>
              <div className="uk-width-expand">
                <Outlet />
              </div>
              <div className="uk-width-1-6"></div>
            </div>
      }
    </div>
  );
}

export default App;
