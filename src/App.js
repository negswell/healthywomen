import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import HealthTracker from './components/HealthTracker';
import 'antd/dist/antd.css';
import firebase from 'firebase';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ForgotPassword from './components/ForgotPassword';
import { auth } from './components/Config';
import { useActions, useValues } from 'kea';
import appLogic from './logic/appLogic';
import _ from 'lodash';
import { Form, Input, Button, notification } from 'antd';

function App() {
  const { user, error } = useValues(appLogic);
  const { setUser, setError } = useActions(appLogic);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userAuth) => {
      if (userAuth !== null) {
        setUser(userAuth);
        console.log(userAuth.email);
      }
    });
    console.log(auth.currentUser);
  }, []);

  useEffect(() => {
    if (!_.isEmpty(error)) {
      notification['error']({
        message: error,
        duration: 2,
      });
      setError('');
    }
  }, []);

  return (
    <div className='App'>
      {!_.isEmpty(auth.currentUser) ? (
        <BrowserRouter>
          <Route exact path='/' component={HomePage} />
          <Route path='/health-tracker' component={HealthTracker} />
        </BrowserRouter>
      ) : (
        <BrowserRouter>
          <Route exact path='/' component={SignIn} />
          <Route path='/signup' component={SignUp} />
          <Route path='/forgot-password' component={ForgotPassword} />
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
