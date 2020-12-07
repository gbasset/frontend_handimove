import React, { useState, useEffect } from "react";
import { StatusAlertService } from 'react-status-alert'

import { withRouter } from 'react-router-dom'
import './Home.css'
import UseFetch from '../../Hooks/UseFetch'
function Home(props) {
    // console.log(props);
    const { status, data, fetchData } = UseFetch();
    // const url = "search/establishment/department/charente"

    // useEffect(() => {
    //     fetchData(url)
    // }, [])
    // useEffect(() => {
    //     if (data) {
    //         StatusAlertService.showSuccess("WELCOME !")
    //     }
    // }, [data])
    return (

        <div className="home_container">
            <h1>Accueil</h1>
            <div>
                {
                    data && data.map(x => x.name)
                }
            </div>
        </div>
    )
}
export default withRouter(Home)