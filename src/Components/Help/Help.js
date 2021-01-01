
import React, { useState, useEffect, useContext } from "react";
import Loader from 'react-loader-spinner'
import { StatusAlertService } from 'react-status-alert'
import Map from '../Map/Map'
import axios from 'axios';
import './Help.css'
export default function Help() {
    const [mdphList, setListOfMdph] = useState([])
    const [isRealoading, setIsRealoading] = useState(true)
    useEffect(() => {
        setIsRealoading(true)
        axios.get(`/mdph/mdph`)
            .then(res => {
                setListOfMdph(res.data)
                setIsRealoading(false)
            })
            .catch(error => {
                StatusAlertService.showError(error.response.data)
                setIsRealoading(false)
            })
    }, [])
    return (
        <div className="help_container">
            <h2>Liste des organismes d'aides</h2>
            <link
                rel="stylesheet"
                href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
                integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
                crossOrigin=""
            />
            <div className="leaflet-container">
                <Map array={mdphList} />
            </div>
            {
                isRealoading &&
                <Loader
                    type="TailSpin"
                    color="#ffd0ad"
                    height={100}
                    width={100}
                    timeout={3000}
                />
            }
        </div>
    )
}
