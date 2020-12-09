import React, { useState, useEffect, useContext } from "react";
import { Context } from '../../Context/Context'
import './Navigation.css'
import pictureAvatar from '../../Assets/blank-profile-picture-973460_640.png'
export default function Navigation({ setActiveLink }) {
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
                <li onClick={(e) => setActiveLink(1)}>Mes informations</li>
                <li onClick={(e) => setActiveLink(2)}>Changer mes informations</li>
                <li>Mes etablissements favoris</li>
                <li>Mes événements favoris</li>
                <li>Mes commentaires</li>
                <li>Contacter un administrateur</li>
            </ul>
        </nav>
    )
}
