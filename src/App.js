import React, { useState, useEffect } from "react";
import './App.css';
import { StatusAlertService } from 'react-status-alert'
import UseFetch from './Hooks/UseFetch'
import Header from './Components/Header/Header';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from './Components/Home/Home';
import AboutUs from './Components/AboutUs/AboutUs';
import User from './Components/Admin/User';
import Events from './Components/Events/Events';
import Search from './Components/Search/Search';
import Help from './Components/Help/Help';
import AuthenticationContainer from './Components/Auth/AuthenticationContainer';
function App() {

  const { status, data, fetchData } = UseFetch();

  // const url = "messages/all"

  // useEffect(() => {
  //   fetchData(url)
  // }, [])
  // useEffect(() => {
  //   if (data) {
  //     StatusAlertService.showSuccess("WELCOME !")
  //   }
  // }, [data])
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Switch >
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/authentication" component={AuthenticationContainer} />
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
