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
        password_validate: "",
        question: "",
        response_question: ""
    })
    const { value, handleChange, notReload, nameSite, setNameSite } = UseInputSearch("");
    const { status, data, fetchData } = UseFetch();
    const { handleChangeForm, valueForm, setValueForm } = UseForm(profil);
    const [listOfSites, setListOfStites] = useState([])
    const [noDataFound, setNoDataFound] = useState(false)
    const [passwordCrypt, setPasswordCrypt] = useState("")
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
        }, 100)
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
        handleChange(e, false, name)
        setIdOfSearchElement(e)
        setListOfStites()
    }
    useEffect(() => {
        const newElementToChange = profil
        newElementToChange.town = idOfSearchElement
        setValueForm(newElementToChange)
    }, [idOfSearchElement])
    const changeTheTownId = (e) => {
        const newElementToChange = profil
        newElementToChange.town = undefined
        setValueForm(newElementToChange)
        setNameSite()
    }
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    function checkIfFormIsValid(e, form) {
        e.preventDefault()

        if (validateEmail(profil.mail) && profil.name.length > 0 && profil.town.length > 0 && profil.question.length > 0 && profil.response_question
            //  && validatePassWord(profil.password)
        ) {
            // setIsNotValid([])
            // setIsRealoading(true)
            //     const subscriber = {
            //         subscriber: formData
            //     }
            //     putTheAccountPromoCode(accountId, subscriber, e => {
            //         setApiKeyIsCreated(e.config.apiSubscriptionKey)
            //         setIsRealoading(false)
            //         getAccountConfiguration()
            //         setIsCreationMode(false)
            //     },
            //         e => {
            //             setIsRealoading(false)
            //         })
            // } else {
            //     let newArrayOfErrors = []
            //     if (!validateEmail(formData.email)) {
            //         newArrayOfErrors.push('email')
            //     }
            //     if (!form.firstName.length > 0) {
            //         newArrayOfErrors.push('firstName')
            //     }
            //     if (!form.lastName.length > 0) {
            //         newArrayOfErrors.push('lastName')
            //     }
            //     setIsNotValid(newArrayOfErrors)
            // }
        }
    }
    console.log("profil", profil);
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
                        value={profil.name}
                    />
                </div>
                <div className="container-input">
                    <label htmlFor="mail">Votre mail</label>
                    <input
                        type="mail"
                        name="mail"
                        onChange={(e) => handleChangeForm(e)}
                        value={profil.mail}
                    />
                </div>
                <div className="container-input">
                    <label htmlFor="name">Votre ville</label>
                    <input
                        type="text"
                        name="town"
                        value={nameSite ? nameSite : value}
                        onChange={(e) => { handleChange(e); changeTheTownId(e) }}
                    />
                    {
                        profil.town === undefined &&
                        <div>Nous ne trouvons pas cette ville, veuillez recommencer</div>
                    }
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
                        name="password"
                        value={profil.password}
                        type="password"
                        onChange={(e) => handleChangeForm(e)}
                    />
                </div>
                <div className="container-input">
                    <label htmlFor="password_validate">Valider votre mot de passe</label>
                    <input
                        type="password"
                        name="password_validate"
                        value={profil.password_validate}
                        onChange={(e) => handleChangeForm(e)}
                    />
                </div>
                <div className="container-input">
                    <label htmlFor="question">Question secrète</label>
                    <input
                        type="text"
                        name="question"
                        value={profil.question}
                        onChange={(e) => handleChangeForm(e)}
                    />
                </div>
                <div className="container-input">
                    <label htmlFor="response_question">Réponse question secrète</label>
                    <input
                        type="text"
                        name="response_question"
                        value={profil.response_question}
                        onChange={(e) => handleChangeForm(e)}
                    />
                </div>
                <div className="container-btn-validate-register">
                    <button
                        className="btnUI"
                        onClick={(e) => checkIfFormIsValid(e, profil)}
                    >
                        Valider
                            </button>
                </div>
            </form>


        </div >
    )
}
