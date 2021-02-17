import React, { useState, useEffect, useContext } from "react";
import { Switch, Link, NavLink, Redirect, withRouter } from 'react-router-dom';
import './Header.css'
import menuIco from './Menuico.svg'
import croix from './Croix.svg'
import { Context } from '../../Context/Context'

function Header() {
    const {
        user,
        setUser
    } = useContext(Context)

    const [menu, showMenu] = useState(false);
    const [smallScreen, setSmallScreen] = useState(false);
    const [oppenMenuAccount, setMenuOppen] = useState(false)

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
                                activeStyle={{ color: "#f6b93b" }}
                            >Accueil</NavLink>
                        </li>
                        <li
                            onClick={hideMenu}
                            className="lienNav"
                            title='Evenements'>
                            <NavLink to={
                                {
                                    pathname: "/search"
                                }}
                                activeStyle={{ color: "#f6b93b" }}
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
                        activeStyle={{ color: "#f6b93b" }}
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
                                activeStyle={{ color: "#f6b93b" }}
                            >S'informer</NavLink>
                        </li>
                        {user && <li
                            onClick={() => { setMenuOppen(!oppenMenuAccount); hideMenu() }}
                            className="lienNavBtnAccount"
                            title='mon compte'>
                            <NavLink to={
                                {
                                    pathname: "/user"
                                }}
                                activeStyle={{ color: "#f6b93b" }}
                            >Mon Compte</NavLink>
                        </li>}
                        {!user && <li
                            onClick={() => { setMenuOppen(!oppenMenuAccount); hideMenu() }}
                            className="lienNavBtnAccount"
                            title='me connecter'>
                            <NavLink to={
                                {
                                    pathname: "/authentication"
                                }}
                                activeStyle={{ color: "#f6b93b" }}
                            >Me connecter</NavLink>
                        </li>}
                        {/* <Dropdown isOpen={oppenMenuAccount}>
                            <ul className="listbox">
                                {!user &&
                                    <li>
                                        <NavLink onClick={() => setMenuOppen(!oppenMenuAccount)} className="item" exact to="/authentication">
                                            Me connecter
                                    </NavLink>
                                    </li>
                                }
                                {user &&
                                    <li>
                                        <NavLink onClick={() => { setMenuOppen(!oppenMenuAccount); setUser(); window.localStorage.removeItem('user'); }} className="item" to="/authentication" >
                                            Me deconnecter
                                    </NavLink>
                                    </li>
                                }
                                {
                                    user &&
                                    <li>
                                        <NavLink onClick={() => setMenuOppen(!oppenMenuAccount)} className="item" exact to="/user">
                                            Mon Compte
                                    </NavLink>
                                    </li>
                                }
                            </ul>
                        </Dropdown> */}
                    </ul>


                )}

            </nav>
            <div className="menuResBtn">
                <NavLink to={
                    { pathname: "/home" }}
                    activeStyle={{ color: "#f6b93b" }}> Handimove</NavLink>

                <img onClick={toggleNavRes} src={!menu ? menuIco : croix} alt="icone menu responsive" className="menuIco" />
            </div>
        </>

    )
}
export default withRouter(Header)