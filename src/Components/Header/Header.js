import React, { useState, useEffect } from "react";
import { Switch, Link, NavLink, Redirect, withRouter } from 'react-router-dom';
import './Header.css'

function Header() {

    const [menu, showMenu] = useState(false);
    const [smallScreen, setSmallScreen] = useState(false);
    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 900px)");
        // addlistener c'est comme addeventlisterner pour les medias queries en JS
        mediaQuery.addListener(handleMediaQueryChange);
        handleMediaQueryChange(mediaQuery);

        return () => {
            mediaQuery.removeListener(handleMediaQueryChange);
        }

    })

    const handleMediaQueryChange = mediaQuery => {
        if (mediaQuery.matches) {
            setSmallScreen(true);
        } else {
            setSmallScreen(false);
        }
    }

    const toggleNavRes = () => {
        showMenu(!menu);
    }

    const hideMenu = () => {

        if (menu === true) {
            showMenu(!menu);
        }

    }
    return (
        <nav className="headerTop">
            {/* <h1 className="h1Home">  Gaëtan Basset </h1> */}
            {(menu || !smallScreen) && (
                <ul className="listeMenu">
                    <li
                        // onClick={hideMenu} 
                        className="lienNav"
                        title='Home'>
                        <NavLink to={
                            {
                                pathname: "/home",
                                // hash: 'test',
                                // search: '?lalala'
                            }}
                            activeStyle={{ color: "#ffcb84e6" }}
                        >Home</NavLink>
                    </li>
                    <li
                        // onClick={hideMenu} 
                        className="lienNav"
                        title='Evenements'>
                        <NavLink to={
                            {
                                pathname: "/search"
                            }}
                            activeStyle={{ color: "#ffcb84e6" }}
                        >Rechercher</NavLink>
                    </li>
                    {/* <li
                    // onClick={hideMenu} 
                    className="lienNav"
                    title='Evenements'>
                    <NavLink to={
                        {
                            pathname: "/events"
                        }}
                        activeStyle={{ color: "#ffcb84e6" }}
                    >Evenements</NavLink>
                </li> */}
                    <li
                        // onClick={hideMenu} 
                        className="lienNav"
                        title='Evenements'>
                        <NavLink to={
                            {
                                pathname: "/help"
                            }}
                            activeStyle={{ color: "#ffcb84e6" }}
                        >Aides</NavLink>
                    </li>
                    <li
                        // onClick={hideMenu} 
                        className="lienNav"
                        title='mon compte'>
                        <NavLink to={
                            {
                                pathname: "/user"
                            }}
                            activeStyle={{ color: "#ffcb84e6" }}
                        >Mon Compte</NavLink>
                    </li>
                    {/* <li
                    // onClick={hideMenu} 
                    className="lienNav"
                    title='à propos'>
                    <NavLink to={
                        {
                            pathname: "/about"
                        }}
                        activeStyle={{ color: "#ffcb84e6" }}
                    >à propos</NavLink>
                </li> */}
                </ul>

            )}

        </nav>


    )
}
export default withRouter(Header)