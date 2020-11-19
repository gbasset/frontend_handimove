import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
import Home from './Components/Home/Home'
import AboutUs from './Components/AboutUs/AboutUs';
import Header from './Components/Header/Header'
import StatusAlert, { StatusAlertService } from 'react-status-alert'
import 'react-status-alert/dist/status-alert.css'
// axios.interceptors.request.use(request => {
//   console.log(request);

//   return request;
// }, error => {
//   console.log(error);
//   return Promise.reject(error);
// });

// axios.interceptors.response.use(response => {
//   console.log(response);
//   // Edit request config
//   showSuccessAlert()
//   return response;
// }, error => {
//   console.log(error);
//   // StatusAlertService.showError()

// });
ReactDOM.render(
  <>
    <StatusAlert />
    <App />
  </>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
