import React, { useState, useEffect, useContext } from "react";
import { Context } from '../../Context/Context'
import UseInputSearch from '../../Hooks/UseInputSearch'
import UseFetch from '../../Hooks/UseFetch'

import './Register.css'
import InputSearch from './../UI/InputSearch';
export default function Register() {
    const {
        user,
        setUser
    } = useContext(Context)
    const { value, handleChange, notReload } = UseInputSearch({ town: "" });
    const { status, data, fetchData } = UseFetch();
    const [listOfSites, setListOfStites] = useState([])
    const [noDataFound, setNoDataFound] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setNoDataFound(false)
            if (value.length !== 0 && !notReload) {
                fetchData(`/town//${value}`)
            } else {
                setListOfStites([])
            }
        }, 500)
        return () => {
            clearTimeout(timer);
        }
    }, [value])
    return (
        <div className="register-container">
            <h1>Bienvenue parmis nous ! </h1>
            <h3>Afin de créer votre espace personnel, nous avons besoin de quelques petites informations vous concernant</h3>
            <form>
                <div className="container-input">
                    <label htmlFor="name">Votre nom</label>
                    <input type="text" />
                </div>
                <div className="container-input">
                    <label htmlFor="name">Votre mail</label>
                    <input type="text" />
                </div>
                <div className="container-input">
                    <label htmlFor="name">Votre ville</label>
                    <input type="text" />
                </div>
                <div className="container-input">
                    <label htmlFor="name">Choisissez un mot de passe</label>
                    <input
                        type="text"
                        name="town"
                    />
                </div>
                <div className="container-input">
                    <label htmlFor="name">Valider votre mot de passe</label>
                    <input type="text" />
                </div>
                <button>Valider</button>
            </form>


        </div>
    )
}
