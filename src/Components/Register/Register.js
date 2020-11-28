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
    const { value, handleChange, notReload } = UseInputSearch("");
    const { status, data, fetchData } = UseFetch();
    const [listOfSites, setListOfStites] = useState([])
    const [noDataFound, setNoDataFound] = useState(false)
    const [idOfSearchElement, setIdOfSearchElement] = useState()

    useEffect(() => {
        const timer = setTimeout(() => {
            setNoDataFound(false)
            if (value.length !== 0 && !notReload) {
                fetchData(`searchby/town/${value}`)
            } else {
                setListOfStites([])
            }
        }, 500)
        return () => {
            clearTimeout(timer);
        }
    }, [value])
    useEffect(() => {
        if (data) {
            if (data.length !== 0) {
                setListOfStites(data)
                setNoDataFound(false)
            } else {
                setNoDataFound(true)
            }
        }
    }, [data])

    const clickOnTown = (e) => {
        handleChange(e, true)
        setIdOfSearchElement(e)
        setListOfStites()
    }
    console.log("data", data);
    console.log("value", value);
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
                    <input
                        type="text"
                        name="town"
                        value={value}
                        onChange={(e) => handleChange(e)}
                    />
                    <div className={listOfSites && listOfSites.length ? "container_list_of_town" : ""}>
                        <ul>
                            {!noDataFound ?
                                <>
                                    {listOfSites && listOfSites.map((site, i) =>
                                        <li
                                            key={i}
                                            onClick={(e) => clickOnTown(site.name)}
                                        > {site.name} -  {site.zipcode}
                                        </li>
                                    )}
                                </>
                                :
                                <li>Il n'y a pas de résults pour cette recherche, veuillez verifier l'orthographe</li>
                            }
                        </ul>
                    </div>
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


        </div >
    )
}
