import React from 'react';
import logo from './logo.svg';
import './App.css';
import {theme} from './config/theme'
import { ThemeProvider } from '@material-ui/core';
import {BrowserRouter, Route} from 'react-router-dom'
import SignIn from './components/auth/SignIn'
import Dashboard from './components/main/dashboard/Dashboard';
import SignUp from './components/auth/SignUp';
import Profile from './components/main/profile/Profile';
import OtherUserProfile from './components/main/profile/OtherUserProfile';
import Account from './components/main/account/Account'
import Messages from './components/main/messages/Messages';

const App = () => {
  return (
    <div className="App" style={{overflow: 'hidden'}}>
        <ThemeProvider theme={theme} >
          <BrowserRouter>
          
            <Route exact path="/login" component={SignIn}/>
            <Route exact path="/signup" component={SignUp}/>
            <Route exact path="/" component={Dashboard}/>
            <Route exact path="/profile" component={Profile}/>
            <Route exact path="/profile/:id" component={OtherUserProfile}/>
            <Route exact path="/account" component={Account} />
            <Route exact path="/messages" component={Messages} />
          </BrowserRouter>
        
        </ThemeProvider>
    </div>
  );
}

export default App;
