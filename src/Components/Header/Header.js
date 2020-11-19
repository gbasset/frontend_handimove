import React, { useState, useEffect } from "react";
import { Switch, Link, NavLink, Redirect, withRouter } from 'react-router-dom';
import './Header.css'

function Header() {
    return (
        <nav className="headerTop">
            {/* <h1 className="h1Home">  Gaëtan Basset </h1> */}
            {/* {(menu || !smallScreen) && ( */}
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

            {/* )} */}

        </nav>


    )
}
export default withRouter(Header)