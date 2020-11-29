import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { StatusAlertService } from 'react-status-alert'
import Loader from 'react-loader-spinner'
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
        username: "",
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
    const [idOfSearchElement, setIdOfSearchElement] = useState()
    const [isNotValid, setIsNotValid] = useState([])
    const [isRealoading, setIsRealoading] = useState(false)

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
    function getPasswordsMatch(input1, input2) {
        if (input1 && input2) {
            if (input1 !== input2) {
                return false
            } else {
                return true
            }
        } else {
            return false
        }
    }
    function checkRequired(inputArray) {
        Object.values(inputArray).forEach((input) => {
            console.log("inputArray", input);
            if (!input) {
                return false
            }
            if (input && input.toString().trim() === '') {
                return false
            }
        })
        return true
    }
    function checkIfFormIsValid(e) {
        e.preventDefault()
        if (validateEmail(profil.mail) && checkRequired(profil) && getPasswordsMatch(profil.password, profil.password_validate) && profil.password.length >= 8
        ) {
            setIsNotValid([])
            setIsRealoading(true)
            axios.post("/register", profil)
                .then(res => {
                    StatusAlertService.showSuccess(`Bienvenue parmis nous ${profil.username}`)
                    setIsRealoading(false)
                })
                .catch(error => {
                    StatusAlertService.showError(error.response.data)
                    setIsRealoading(false)
                })

        } else {
            let newArrayOfErrors = []
            if (!validateEmail(profil.mail)) {
                newArrayOfErrors.push('mail')
            }
            if (!getPasswordsMatch(profil.password, profil.password_validate)) {
                newArrayOfErrors.push('password', 'password_validate')
            }
            if (profil.username.trim() === '') {
                newArrayOfErrors.push('username')
            }
            if (profil.password.length < 8) {
                newArrayOfErrors.push('password', 'password_validate')
            }
            if (!profil.town) {
                newArrayOfErrors.push('town')
            }
            if (!profil.question.length > 0) {
                newArrayOfErrors.push('question')
            }
            if (!profil.response_question.length > 0) {
                newArrayOfErrors.push('response_question')
            }
            setIsNotValid(newArrayOfErrors)
        }
    }


    const listOption = [
        { value: "born", label: "Quel est votre ville de naissance ? " },
        { value: "mother", label: "Quel est le nom de naissance de votre mère  ? " },
        { value: "mother", label: "Quel est le prénom de votre premier animal de compagnie ? " },
    ]
    return (
        <div className="register-container">
            <h1>Bienvenue parmis nous ! </h1>
            <h3>Afin de créer votre espace personnel, nous avons besoin de quelques petites informations vous concernant</h3>
            <form>
                {
                    isRealoading &&
                    <Loader
                        type="TailSpin"
                        color="#ffd0ad"
                        height={100}
                        width={100}
                        timeout={3000}
                    />
                }
                <div className="container-input">
                    <label htmlFor="name">Votre nom</label>
                    <input
                        type="text"
                        name="username"
                        className={isNotValid.includes('username') ? 'information_not_good' : ''}
                        onChange={(e) => handleChangeForm(e)}
                        value={profil.username}
                    />
                    {isNotValid.includes('username') && <p className="information_error_message">Le champ est requis</p>}
                </div>
                <div className="container-input">
                    <label htmlFor="mail">Votre mail</label>
                    <input
                        type="mail"
                        name="mail"
                        className={isNotValid.includes('mail') ? 'information_not_good' : ''}
                        onChange={(e) => handleChangeForm(e)}
                        value={profil.mail}
                    />
                    {isNotValid.includes('mail') && <p className="information_error_message">Le format de cet email n'\est pas valide </p>}
                </div>
                <div className="container-input">
                    <label htmlFor="name">Votre ville</label>
                    <input
                        type="text"
                        name="town"
                        className={isNotValid.includes('town') ? 'information_not_good' : ''}
                        value={nameSite ? nameSite : value}
                        onChange={(e) => { handleChange(e); changeTheTownId(e) }}
                    />
                    {isNotValid.includes('town') && <p className="information_error_message">Le champs est requis </p>}
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
                        className={isNotValid.includes('password') ? 'information_not_good' : ''}
                        onChange={(e) => handleChangeForm(e)}
                    />
                    {isNotValid.includes('password') && <p className="information_error_message">Les mots de passes doivent êtres identiques et comporter au moins 8 caractères </p>}
                </div>
                <div className="container-input">
                    <label htmlFor="password_validate">Valider votre mot de passe</label>
                    <input
                        type="password"
                        name="password_validate"
                        className={isNotValid.includes('password_validate') ? 'information_not_good' : ''}
                        value={profil.password_validate}
                        onChange={(e) => handleChangeForm(e)}
                    />
                    {isNotValid.includes('password_validate') && <p className="information_error_message">Les mots de passes doivent êtres identiques et comporter au moins 8 caractères </p>}
                </div>
                <div className="container-select">
                    <label htmlFor="question">Question secrète</label>
                    <select
                        name="question"
                        value={profil.question}
                        className={isNotValid.includes('question') ? 'information_not_good' : ''}
                        onChange={(e) => handleChangeForm(e)}
                    >
                        <option value="" disabled> Selectionner une question</option>
                        {listOption.map((x, i) => <option key={i} > {x.label}</option>)}
                    </select>
                    {isNotValid.includes('question') && <p className="information_error_message">Le champs est requis</p>}
                </div>
                <div className="container-input">
                    <label htmlFor="response_question">Réponse question secrète</label>
                    <input
                        type="text"
                        name="response_question"
                        className={isNotValid.includes('response_question') ? 'information_not_good' : ''}
                        value={profil.response_question}
                        onChange={(e) => handleChangeForm(e)}
                    />
                    {isNotValid.includes('response_question') && <p className="information_error_message">Le champs est requis ou invalide</p>}
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
