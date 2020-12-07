import React, { useState, useEffect, useContext } from "react";
import { Context } from '../../Context/Context'
import './Navigation.css'
export default function Navigation() {
    const {
        user,
        setUser
    } = useContext(Context)
    return (
        <nav>

        </nav>
    )
}
