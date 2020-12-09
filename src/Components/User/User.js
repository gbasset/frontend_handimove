import React, { useState, useEffect, useContext } from "react";
import './User.css'
import { Context } from '../../Context/Context'
import { Redirect } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import AccountInformations from './AccountInformations';
import AccountEditInformations from './AccountEditInformations';
import EstablishmentsFav from './EstablishmentsFav'
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
                    activeLink={activeLink}
                />
            </div>
            <div className="user-container-data">
                {activeLink === 1 &&
                    <>
                        <h1> Mes informations  de compte</h1>
                        <AccountInformations />
                    </>
                }
                {activeLink === 2 &&
                    <>
                        <h1> Modifier mes informations de compte</h1>
                        <AccountEditInformations />
                    </>
                }
                {activeLink === 3 &&
                    <>
                        <h1> Mes établissements favoris</h1>
                        <EstablishmentsFav />
                    </>
                }
            </div>
        </div>
    )
}
