import React, { useState, useEffect, useContext } from "react";
import { Context } from '../../Context/Context'
import './Navigation.css'
import pictureAvatar from '../../Assets/blank-profile-picture-973460_640.png'
export default function Navigation({ setActiveLink, activeLink }) {
    const {
        user,
        setUser
    } = useContext(Context)
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
                >Changer mon mot de passe</li>
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
                {
                    user && user.is_admin === 0 &&
                    <>
                        <li
                            onClick={(e) => setActiveLink(8)}
                            className={activeLink === 8 ? "isActive" : ""}
                        >Gestion des commentaires</li>
                        <li

                        >Gestion des Utilisateurs</li>
                        <li

                        >Gestion des Etablissements</li>
                        <li

                        >Gestion des événements</li>
                        <li

                        >Messages</li>
                    </>
                }
            </ul>
        </nav>
    )
}
