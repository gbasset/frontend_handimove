import React, { useState, useContext, useEffect } from "react";
import { Context } from '../../Context/Context'
import { Redirect } from 'react-router-dom';
import './Navigation.css'
import pictureAvatar from '../../Assets/blank-profile-picture-973460_640.png';
import { FaRegCommentDots, FaUserFriends, FaCalendarAlt, FaImages, FaInfoCircle, FaHome } from 'react-icons/fa'
import { BsFillHouseDoorFill } from 'react-icons/bs'
import { HiMail } from 'react-icons/hi'
import { RiLockPasswordFill } from 'react-icons/ri'
import { MdContactMail } from 'react-icons/md'
import { IoMdLogOut } from 'react-icons/io'

export default function Navigation({ setActiveLink, activeLink }) {
    const {
        user,
        isAdmin,
        setUser,
        setIsAdmin
    } = useContext(Context)

    const [redirect, setRedirect] = useState(false);
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
    const disconnect = () => {
        window.localStorage.removeItem('user');
        setUser();
        setIsAdmin();
        setRedirect(true);
    }
    if (redirect) {
        return <Redirect to='/authentication' />
    }
    return (
        <>
            {!smallScreen &&
                <nav className="container-navigation-user">
                    <header>
                        <div className="container-user-infos">
                            <img src={user && user.avatar ? user.avatar : pictureAvatar} alt="avatar du compte" />
                            <div className="container-name-user">
                                <span>{user && user.username} <IoMdLogOut className="item-admin"
                                    onClick={disconnect}
                                /> </span>
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
                            {isAdmin &&
                                <>
                                    <div title="Gestion des commentaires"
                                        onClick={(e) => setActiveLink(8)}
                                        className={activeLink === 8 ? "isActive" : ""}
                                    >
                                        <FaRegCommentDots className="item-admin"
                                        />
                                    </div>
                                    <div title="Gestion des utilisateurs"
                                        onClick={(e) => setActiveLink(9)}
                                        className={activeLink === 9 ? "isActive" : ""}
                                    ><FaUserFriends className="item-admin" />
                                    </div>
                                    <div title="Gestion des Etablissements"
                                        onClick={(e) => setActiveLink(10)}
                                        className={activeLink === 10 ? "isActive" : ""}
                                    ><BsFillHouseDoorFill className="item-admin" /></div>
                                    <div title="Gestion des événements"
                                        onClick={(e) => setActiveLink(11)}
                                        className={activeLink === 11 ? "isActive" : ""}
                                    ><FaCalendarAlt className="item-admin" /></div>
                                    <div title="Gestion des messages"
                                        onClick={(e) => setActiveLink(12)}
                                        className={activeLink === 12 ? "isActive" : ""}
                                    ><HiMail className="item-admin" /></div>
                                    <div title="Gestion des avatars"
                                        onClick={(e) => setActiveLink(13)}
                                        className={activeLink === 13 ? "isActive" : ""}
                                    ><FaImages className="item-admin" /></div>
                                </>
                            }
                        </div>
                    </ul>
                </nav>}
            {smallScreen &&
                <nav className="nav-mobile">
                    <div className="container-user-infos">
                        <img src={user && user.avatar ? user.avatar : pictureAvatar} alt="avatar du compte" />
                        <div className="container-name-user">
                            <span>{user && user.username} <i className="fas fa-sign-out-alt"
                                onClick={disconnect}
                            ></i> </span>
                            <span>{user && user.mail}</span>
                        </div>
                    </div>
                    <div className="container-navigation-mobile">
                        <ul>
                            <li onClick={(e) => setActiveLink(2)}
                                className={activeLink === 2 ? "isActive" : ""}
                                title="Mes informations"
                            ><FaInfoCircle className="item-admin" /></li>
                            <li onClick={(e) => setActiveLink(6)}
                                className={activeLink === 6 ? "isActive" : ""}
                                title="Mon mot de passe"
                            ><RiLockPasswordFill className="item-admin" /></li>
                            <li onClick={(e) => setActiveLink(3)}
                                className={activeLink === 3 ? "isActive" : ""}
                                title="Mes etablissements favoris"
                            ><FaHome className="item-admin" /></li>
                            <li
                                title="Mes événements favoris"
                                onClick={(e) => setActiveLink(4)}
                                className={activeLink === 4 ? "isActive" : ""}
                            ><FaCalendarAlt className="item-admin" /></li>
                            <li
                                title="Mes commentaires"
                                onClick={(e) => setActiveLink(5)}
                                className={activeLink === 5 ? "isActive" : ""}
                            ><FaRegCommentDots className="item-admin" /></li>
                            <li
                                title="Contacter un administrateur"
                                onClick={(e) => setActiveLink(7)}
                                className={activeLink === 7 ? "isActive" : ""}
                            ><MdContactMail className="item-admin" /></li>
                        </ul>
                    </div>
                </nav>
            }
        </>
    )
}
