import React, { useState } from "react";
import axios from 'axios';
import { StatusAlertService } from 'react-status-alert'

export default function useFetch() {
    const [status, setStatus] = useState('');
    const [data, setData] = useState();
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
                StatusAlertService.showError(error.message)
            })
    }
    const postData = async (url, postValue) => {
        if (!url) return;
        setStatus('fetching');
        axios.post(url, postValue)
            .then(res => {
                setStatus('fetched');
                // StatusAlertService.showSuccess(res.request.responseText)
                setData(res.data);
            })
            .catch(error => {
                StatusAlertService.showError(error.message)
            })
    }
    return { status, data, fetchData, setData, postData }
};

