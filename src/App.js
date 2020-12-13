import React, { useState, useEffect, useContext } from "react";
import './App.css';
import { StatusAlertService } from 'react-status-alert'
import UseFetch from './Hooks/UseFetch'
import Header from './Components/Header/Header';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from './Components/Home/Home';
import AboutUs from './Components/AboutUs/AboutUs';
import User from './Components/User/User';
import Events from './Components/Events/Events';
import Search from './Components/Search/Search';
import Help from './Components/Help/Help';
import AuthenticationContainer from './Components/Auth/AuthenticationContainer';
import ChangePassword from './Components/Auth/ChangePassword';
import Register from './Components/Register/Register';
import { Context } from './Context/Context'
let jwt = require('jsonwebtoken');

function App() {
  const {
    user,
    setUser
  } = useContext(Context)
  const { status, data, fetchData } = UseFetch();
  const checkIfTokenExist = () => {
    const token = JSON.parse(localStorage.getItem('user'))
    if (token) {
      const tokenToVerify = token.token
      jwt.verify(tokenToVerify, process.env.REACT_APP_SECRET, function (err, decoded) {
        if (err) {
          console.log("err", err);
          StatusAlertService.showInfo("Nous n'avons pas pu vous connecter, veuillez recommencer")
        }
        else {
          StatusAlertService.showSuccess(`Heureux de vous retrouver ${token.username} !`)
          setUser(token)
        }
      })
    }
  }
  useEffect(() => {
    checkIfTokenExist()
  }, [])

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Switch >
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/authentication" component={AuthenticationContainer} />
          <Route exact path="/changePassword" component={ChangePassword} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/about" component={AboutUs} />
          <Route exact path="/user" component={User} />
          {/* <Route exact path="/events" component={Events} /> */}
          <Route exact path="/search" component={Search} />
          <Route exact path="/help" component={Help} />

        </Switch>
        {/* <Header /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
