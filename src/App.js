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
import { notification } from 'antd';
import { useState } from 'react';
import { Spin } from 'antd';
import AddRecord from './components/AddRecord';

function App() {
  const { error } = useValues(appLogic);
  const { setUser, setError } = useActions(appLogic);

  const [authenticated, setAuthenticated] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((userAuth) => {
      setLoadingAuth(false);

      console.log(userAuth);
      if (userAuth !== null) {
        setUser(userAuth);
        setAuthenticated(true);
        console.log(userAuth.email);
      } else {
        setAuthenticated(false);
      }
    });

    console.log(auth.currentUser);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!_.isEmpty(error)) {
      notification['error']({
        message: error,
        duration: 2,
      });
      console.log(error);
      setError('');
    }
  }, [error]);

  return (
    <div className='App'>
      {loadingAuth ? (
        <Spin
          size='large'
          spinning={loadingAuth}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      ) : authenticated ? (
        <BrowserRouter>
          <Route exact path='/' component={HomePage} />
          <Route path='/health-tracker' component={HealthTracker} />
          <Route path='/add-record' component={AddRecord} />
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
