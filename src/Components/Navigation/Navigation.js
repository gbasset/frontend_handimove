import React, { useState, useEffect, useContext } from "react";
import { Context } from '../../Context/Context'
import './Navigation.css'
export default function Navigation() {
    const {
        user,
        setUser
    } = useContext(Context)
    return (
        <nav className="container-navigation-user">
            <div>Bienvenue {user.username}</div>
            <ul>
                <li>Mes informations</li>
                <li>Changer mon mot de passe</li>
                <li>Mes etablissements favoris</li>
                <li>Mes événements favoris</li>
                <li>Mes commentaires</li>
                <li>Contacter un administrateur</li>
            </ul>
        </nav>
    )
}
