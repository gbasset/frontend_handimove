import React, { useState, useEffect, useContext } from "react";
import './User.css'
import { Context } from '../../Context/Context'
import { Redirect } from 'react-router-dom';
import Navigation from './../Navigation/Navigation';
export default function User() {
    const {
        user,
        setUser
    } = useContext(Context)
    console.log("user", user);
    if (!user) {
        const token = JSON.parse(localStorage.getItem('user'))
        if (!token) {
            return <Redirect to={`/authentication`} />;
        }
    }

    return (
        <div className="user_container">
            <div>

                <Navigation />

            </div>
            <div className="user-container-data">
                <h1>Mon Compte </h1>
            </div>
        </div>
    )
}
