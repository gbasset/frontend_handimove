import React, { useState, useContext } from "react";
import axios from 'axios';
import { StatusAlertService } from 'react-status-alert'
import { Context } from '../Context/Context'
let jwt = require('jsonwebtoken');


export default function useFetch() {
    const [status, setStatus] = useState('');
    const [data, setData] = useState();
    const [error, setError] = useState();
    const {
        setUser,
    } = useContext(Context)
    const fetchData = async (url, submit) => {
        if (!url) return;
        setStatus('fetching');
        axios.get(url)
            .then(res => {
                setStatus('fetched');
                setData(res.data);
            })
            .catch(error => {
                StatusAlertService.showError(error.response.data)
                setError(error.response.data)
                setStatus('error fetch');
            })
    }
    const postData = async (url, postValue) => {
        if (!url) return;
        setStatus('fetching');
        axios.post(url, postValue)
            .then(res => {
                setStatus('fetched');
                const token = res.headers.token
                let user = { ...res.data.userInformations[0], token }
                token && localStorage.setItem('user', JSON.stringify(user))
                if (token) {
                    const tokenToVerify = token
                    jwt.verify(tokenToVerify, process.env.REACT_APP_SECRET, function (err, decoded) {
                        if (err) {
                            console.log("err", err);
                            StatusAlertService.showSuccess("Nous n'avons pas pu vous connecter, veuillez recommencer")
                        }
                        else {
                            // if (token.is_admin === 0) {
                            //     setIsAdmin(true)
                            // } else {
                            //     setIsAdmin(false)
                            // }
                            setUser(token)
                        }
                    })
                }
                token && setUser(user)
                // StatusAlertService.showSuccess(res.request.responseText)
                //https://www.codementor.io/@obabichev/react-token-auth-12os8txqo1
                setData(res.data);
            })
            .catch(error => {
                console.log("error", error.response);
                if (error.response.data) {
                    StatusAlertService.showError(error.response && error.response.data)
                } else {
                    StatusAlertService.showError(error.response && error.response.statusText)
                }
                setError(error.response && error.response.statusText)
            })
    }

    return { status, data, error, setError, fetchData, setData, postData }
};

