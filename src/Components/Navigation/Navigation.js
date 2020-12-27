import React, { useState, useEffect, useContext } from "react";
import { Context } from '../../Context/Context'
import { Redirect } from 'react-router-dom';
import './Navigation.css'
import pictureAvatar from '../../Assets/blank-profile-picture-973460_640.png'
export default function Navigation({ setActiveLink, activeLink }) {
    const {
        user,
        setUser
    } = useContext(Context)
    const [isAdmin, setIsAdmin] = useState(false)
    useEffect(() => {
        if (user) {
            if (user.is_admin === 0) {
                setIsAdmin(true)
            } else {
                setIsAdmin(false)
            }
        }
    }, [user])
    console.log("isAdmin", isAdmin);
    return (
        <nav className="container-navigation-user">
            <header>
                <div className="container-user-infos">
                    <img src={user && user.avatar ? user.avatar : pictureAvatar} alt="avatar du compte" />
                    <div className="container-name-user">
                        <span>{user && user.username} </span>
                        <span>{user && user.mail}</span>
                    </div>
                </div>
            </header>
            <ul>
                <li onClick={(e) => setActiveLink(2)}
                    className={activeLink === 2 ? "isActive" : ""}
                >Mes informations</li>
                <li onClick={(e) => setActiveLink(6)}
                    className={activeLink === 6 ? "isActive" : ""}
                >Mon mot de passe</li>
                <li onClick={(e) => setActiveLink(3)}
                    className={activeLink === 3 ? "isActive" : ""}
                >Mes etablissements favoris</li>
                <li
                    onClick={(e) => setActiveLink(4)}
                    className={activeLink === 4 ? "isActive" : ""}
                >Mes événements favoris</li>
                <li
                    onClick={(e) => setActiveLink(5)}
                    className={activeLink === 5 ? "isActive" : ""}
                >Mes commentaires</li>
                <li
                    onClick={(e) => setActiveLink(7)}
                    className={activeLink === 7 ? "isActive" : ""}
                >Contacter un administrateur</li>
                <div className="navigation-admin-container">
                    {
                        isAdmin &&
                        <>
                            <div title="Gestion des commentaires"
                                onClick={(e) => setActiveLink(8)}
                                className={activeLink === 8 ? "isActive" : ""}
                            ><i className="fas fa-comment-dots"></i></div>
                            <div title="Gestion des utilisateurs"
                                onClick={(e) => setActiveLink(9)}
                                className={activeLink === 9 ? "isActive" : ""}
                            >
                                <i className="fas fa-users"></i>
                            </div>
                            <div title="Gestion des Etablissements"
                                onClick={(e) => setActiveLink(10)}
                                className={activeLink === 10 ? "isActive" : ""}
                            ><i className="fas fa-home"></i></div>
                            <div title="Gestion des événements"
                                onClick={(e) => setActiveLink(11)}
                                className={activeLink === 11 ? "isActive" : ""}
                            ><i className="far fa-calendar-alt"></i></div>
                            <div title="Gestion des messages"
                                onClick={(e) => setActiveLink(12)}
                                className={activeLink === 12 ? "isActive" : ""}
                            ><i className="fas fa-envelope-open-text"></i></div>
                        </>
                    }
                </div>
            </ul>

        </nav>
    )
}
