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
        user,
        setUser
    } = useContext(Context)
    const fetchData = async (url, submit) => {
        if (!url) return;
        setStatus('fetching');
        axios.get(url)
            .then(res => {
                setStatus('fetched');
                // StatusAlertService.showSuccess(res.request.responseText)
                setData(res.data);
            })
            .catch(error => {
                StatusAlertService.showError(error.response.data)
                setError(error.response.data)
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
                    const tokenToVerify = token.token
                    jwt.verify(tokenToVerify, process.env.REACT_APP_SECRET, function (err, decoded) {
                        if (err) {
                            console.log("err", err);
                            StatusAlertService.showSuccess("Nous n'avons pas pu vous connecter, veuillez recommencer")
                        }
                        else {
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
                console.log("error", error);
                StatusAlertService.showError(error.response && error.response.data)
                setError(error.response && error.response.data)
            })
    }
    return { status, data, error, setError, fetchData, setData, postData }
};

