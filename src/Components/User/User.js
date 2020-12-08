import React, { useState, useEffect, useContext } from "react";
import './User.css'
import { Context } from '../../Context/Context'
import { Redirect } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import AccountInformations from './AccountInformations';
export default function User() {
    const {
        user,
        setUser
    } = useContext(Context)
    console.log("user", user);
    const [activeLink, setActiveLink] = useState(1)

    if (!user) {
        const token = JSON.parse(localStorage.getItem('user'))
        if (!token) {
            return <Redirect to={`/authentication`} />;
        }
    }

    return (
        <div className="user_container">
            <div>
                <Navigation
                    setActiveLink={(e) => setActiveLink(e)}
                />
            </div>
            <div className="user-container-data">
                {activeLink === 1 &&
                    <>
                        <h1> Mes informations  de compte</h1>
                        <AccountInformations />
                    </>

                }
            </div>
        </div>
    )
}
