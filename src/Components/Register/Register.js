import React, { useState, useEffect, useContext } from "react";
import { Context } from '../../Context/Context'
import UseInputSearch from '../../Hooks/UseInputSearch'
import UseForm from '../../Hooks/UseForm'
import UseFetch from '../../Hooks/UseFetch'

import './Register.css'
import InputSearch from './../UI/InputSearch';
export default function Register() {
    const {
        user,
        setUser
    } = useContext(Context)
    const [profil, setProfil] = useState({
        name: "",
        mail: "",
        town: "",
        password: "",
        question: "",
        response_question: ""
    })
    const { value, handleChange, notReload, nameSite, setNameSite } = UseInputSearch("");
    const { status, data, fetchData } = UseFetch();
    const { handleChangeForm, valueForm, setValueForm } = UseForm(profil);
    const [listOfSites, setListOfStites] = useState([])
    const [noDataFound, setNoDataFound] = useState(false)
    const [idOfSearchElement, setIdOfSearchElement] = useState()

    console.log("valueForm", valueForm);
    useEffect(() => {
        const timer = setTimeout(() => {
            setNoDataFound(false)
            if (value.length !== 0 && !notReload) {
                fetchData(`searchby/town/${value}`)
            } else {
                setListOfStites([])
            }
        }, 200)
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
    useEffect(() => {
        setProfil(valueForm)
    }, [valueForm])

    const clickOnTown = (e, name) => {
        console.log("e", e);
        handleChange(e, false, name)
        setIdOfSearchElement(e)
        setListOfStites()
    }
    useEffect(() => {
        const newElementToChange = profil
        newElementToChange.town = idOfSearchElement
        setValueForm(newElementToChange)
    }, [idOfSearchElement])
    const changeTheTownId = () => {
        const newElementToChange = profil
        newElementToChange.town = ""
        setValueForm(newElementToChange)
        setNameSite()
    }
    console.log("value", value);

    return (
        <div className="register-container">
            <h1>Bienvenue parmis nous ! </h1>
            <h3>Afin de créer votre espace personnel, nous avons besoin de quelques petites informations vous concernant</h3>
            <form>
                <div className="container-input">
                    <label htmlFor="name">Votre nom</label>
                    <input
                        type="text"
                        name="name"
                        onChange={(e) => handleChangeForm(e)}
                    />
                </div>
                <div className="container-input">
                    <label htmlFor="mail">Votre mail</label>
                    <input
                        type="mail"
                        name="mail"
                        onChange={(e) => handleChangeForm(e)}
                    />
                </div>
                <div className="container-input">
                    <label htmlFor="name">Votre ville</label>
                    <input
                        type="text"
                        name="town"
                        value={nameSite}
                        onChange={(e) => { handleChange(e); changeTheTownId() }}
                    />
                    {/* <div>{`Nous ne trouvons pas cette ville, veuillez recommencer`}</div> */}
                    <div className={listOfSites && listOfSites.length ? "container_list_of_town_register" : "displayNone"}>
                        <ul>
                            {!noDataFound ?
                                <>
                                    {listOfSites && listOfSites.map((site, i) =>
                                        <li
                                            key={i}
                                            onClick={(e) => clickOnTown(site.id, site.name)}
                                        > {site.name} -  {site.zipcode}
                                        </li>
                                    )}
                                    <p>Veuillez cliquer sur votre choix pour valider la saisie</p>
                                </>
                                :
                                <li>Il n'y a pas de résults pour cette recherche, veuillez verifier l'orthographe</li>
                            }
                        </ul>
                    </div>
                </div>
                <div className="container-input">
                    <label htmlFor="password">Choisissez un mot de passe</label>
                    <input
                        type="text"
                        name="password"
                    />
                </div>
                <div className="container-input">
                    <label htmlFor="pass_validate">Valider votre mot de passe</label>
                    <input type="password" />
                </div>
                <div className="container-input">
                    <label htmlFor="question">Question secrète</label>
                    <input type="text" />
                </div>
                <div className="container-input">
                    <label htmlFor="response_question">Réponse question secrète</label>
                    <input type="text" />
                </div>
                <button>Valider</button>
            </form>


        </div >
    )
}
