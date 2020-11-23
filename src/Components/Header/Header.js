import React, { useState, useEffect } from "react";
import { Switch, Link, NavLink, Redirect, withRouter } from 'react-router-dom';
import './Header.css'
import menuIco from './Menuico.svg'
import croix from './Croix.svg'
import Dropdown from './../UI/Dropdown';
function Header() {

    const [menu, showMenu] = useState(false);
    const [smallScreen, setSmallScreen] = useState(false);
    const [oppenMenuAccount, setMenuOppen] = useState(false)
    console.log("oppenMenuAccount", oppenMenuAccount);
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
        <>
            <nav className="headerTop">
                {
                    smallScreen && <h1>test</h1>
                }
                {(menu || !smallScreen) && (
                    <ul className="listeMenu">
                        <li
                            onClick={hideMenu}
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
                            onClick={hideMenu}
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
                            onClick={hideMenu}
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
                            onClick={() => { setMenuOppen(!oppenMenuAccount); hideMenu() }}
                            className="lienNav"
                            title='mon compte'>
                            <NavLink to={
                                {
                                    pathname: "/user"
                                }}
                                activeStyle={{ color: "#ffcb84e6" }}
                            >Mon Compte</NavLink>
                        </li>
                        <Dropdown isOpen={oppenMenuAccount}>
                            <ul className="listbox">
                                <li>
                                    <NavLink onClick={() => setMenuOppen(!oppenMenuAccount)} className="item" exact to="/creation">
                                        Me connecter
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink onClick={() => setMenuOppen(!oppenMenuAccount)} className="item" exact to="/creationSimplify">
                                        Mon Compte
                                    </NavLink>
                                </li>
                            </ul>
                        </Dropdown>
                    </ul>


                )}

            </nav>
            <div className="menuResBtn">
                <img onClick={toggleNavRes} src={!menu ? menuIco : croix} alt="icone menu responsive" className="menuIco" />
            </div>
        </>

    )
}
export default withRouter(Header)