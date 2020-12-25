import React, { useState, useEffect, useContext } from "react";
import { StatusAlertService } from 'react-status-alert'

import './User.css'
import { Context } from '../../Context/Context'
import { Redirect } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import AccountInformations from './AccountInformations';
import AccountEditInformations from './AccountEditInformations';
import EstablishmentsFav from './EstablishmentsFav'
import EventsFav from './EventsFav'
import UserComments from './UserComments'
import EditPassWord from './EditPassWord'
import Contact from '../Contact/Contact'
import AdminComments from '../Admin/AdminComments'
import EstablishmentContainer from '../Admin/EstablishmentContainer'
import EventsContainer from '../Admin/EventsContainer'
import MessageContainer from '../Admin/MessageContainer'
import UsersContainer from '../Admin/UsersContainer'
let jwt = require('jsonwebtoken');

export default function User() {
    const {
        user,
        setUser
    } = useContext(Context)

    const [activeLink, setActiveLink] = useState(2)

    if (!user) {
        const token = JSON.parse(localStorage.getItem('user'))
        if (token) {
            const tokenToVerify = token.token
            jwt.verify(tokenToVerify, process.env.REACT_APP_SECRET, function (err, decoded) {
                if (!err) {
                    StatusAlertService.showSuccess(`Heureux de vous retrouver ${token.username} !`)
                    setUser(token)
                } else {
                    return <Redirect to={`/authentication`} push />
                }
            })
        } else {
            return <Redirect to={`/authentication`} push />
        }
    }
    console.log("user", user);

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
                        <div className="container-data-user">
                            <AccountInformations />
                        </div>
                    </>
                }
                {activeLink === 2 &&
                    <>
                        <h1> Modifier mes informations de compte</h1>
                        <div className="container-data-user">
                            <AccountEditInformations />
                        </div>
                    </>
                }
                {activeLink === 3 &&
                    <>
                        <h1> Mes établissements favoris</h1>
                        <div className="container-data-user">
                            <EstablishmentsFav />
                        </div>
                    </>
                }
                {activeLink === 4 &&
                    <>
                        <h1> Mes événements favoris</h1>
                        <div className="container-data-user">
                            <EventsFav />
                        </div>
                    </>
                }
                {activeLink === 5 &&
                    <>
                        <h1> Mes commentaires</h1>
                        <div className="container-data-user">
                            <UserComments />
                        </div>
                    </>
                }
                {activeLink === 6 &&
                    <>
                        <h1> Changer mon mot de passe</h1>
                        <div className="container-data-user">
                            <EditPassWord />
                        </div>
                    </>
                }
                {activeLink === 7 &&
                    <>
                        <h1> Contacter un administrateur</h1>
                        <div className="container-data-user">
                            <Contact />
                        </div>
                    </>
                }
                {activeLink === 8 &&
                    <>
                        <h1> Gestion des commentaires</h1>
                        <div className="container-data-user">
                            <AdminComments />
                        </div>
                    </>
                }
                {activeLink === 9 &&
                    <>
                        <h1> Gestion des utilisateurs</h1>
                        <div className="container-data-user">
                            <UsersContainer />
                        </div>
                    </>
                }
                {activeLink === 10 &&
                    <>
                        <h1> Gestion des Etablissements</h1>
                        <div className="container-data-user">
                        </div>
                        <EstablishmentContainer />
                    </>
                }
                {activeLink === 11 &&
                    <>
                        <h1> Gestion des événements </h1>
                        <div className="container-data-user">
                            <EventsContainer />
                        </div>
                    </>
                }
                {activeLink === 12 &&
                    <>
                        <h1> Gestion des messages </h1>
                        <div className="container-data-user">
                            <MessageContainer />
                        </div>
                    </>
                }

            </div>
        </div>
    )
}

