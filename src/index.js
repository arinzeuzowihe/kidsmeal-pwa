import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home';
import MealQuestionaire from './components/MealQuestionaire';
import MealManagement from './components/MealManagement';
import LoginForm from './components/LoginForm';
import  store  from './redux/store'
import { Provider } from 'react-redux';
import MealSuggestionList from './components/MealSuggestionList';


//https://reactrouter.com/en/main/start/tutorial
const broswerRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "/nextmeal",
        element: <MealQuestionaire />
      },
      {
        path: "/meals/:id",
        element: <MealManagement />
      },
      {
        path: "/suggestions",
        element: <MealSuggestionList />
      },
      {
        path: "/logout",
        element: <LoginForm />
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={broswerRouter} />
    </React.StrictMode>
  </Provider>
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
