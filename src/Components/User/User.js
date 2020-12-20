import React, { useState, useEffect, useContext } from "react";
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
export default function User() {
    const {
        user,
        setUser
    } = useContext(Context)
    console.log("user", user);
    const [activeLink, setActiveLink] = useState(2)

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



            </div>
        </div>
    )
}
