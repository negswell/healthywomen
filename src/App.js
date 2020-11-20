import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import HomePage from './components/HomePage'
import HealthTracker from './components/HealthTracker'
import "antd/dist/antd.css";
// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from 'firebase'
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ForgotPassword from './components/ForgotPassword';


const fire=firebase.initializeApp()
function App() {
  const provider = new firebase.auth.GoogleAuthProvider();
  const signInWithGoogle = () => {
    fire.auth.signInWithPopup(provider);
  };
 

  const [user,setUser] =useState({})
    

  // }
  return (
    <div className="App">

      {user ? 
(
<BrowserRouter>
<Route exact path="/" component={HomePage}/>
          <Route path="/health-tracker" component={HealthTracker}/>
          </BrowserRouter>) :
       (<BrowserRouter>
      
          
          <Route exact path="/" component={SignIn}/>
          <Route path="/signup" component={SignUp}/>
          <Route path="/forgot-password" component={ForgotPassword}/>

      
      </BrowserRouter>)}
      
    </div>
  );
}

export default App;
