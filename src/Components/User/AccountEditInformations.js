import React, { useState, useEffect, useContext } from "react";
import { Context } from '../../Context/Context'
import InputChange from '../../Components/UI/InputChange'
import './AccountEditInformations.css'
import pictureAvatar from '../../Assets/blank-profile-picture-973460_640.png'
import axios from 'axios';
import Btn from '../UI/Btn'
import Loader from 'react-loader-spinner'
import { StatusAlertService } from 'react-status-alert'
let jwt = require('jsonwebtoken');

export default function AccountEditInformations() {
    const {
        user,
        setUser
    } = useContext(Context)

    const [isNotValid, setIsNotValid] = useState([])
    const [isRealoading, setIsRealoading] = useState(true)

    const [form, setForm] = useState({
        username: user.username,
        mail: user.mail,
        password: "00000000",
        avatar_url: user.avatar_url
    })
    const handleChange = (e) => {
        setForm(prevValues => ({
            ...prevValues,
            [e.target.name]: e.target.value
        })
        )
    }
    console.log("form", form);
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    function getPasswordsMatch(input1) {
        if (input1 !== "00000000") {
            return true
        } else {
            return false
        }
    }
    function checkIfFormIsValid(e) {
        e.preventDefault()
        if (validateEmail(form.mail) && getPasswordsMatch(form.password) && form.password.length >= 8 && form.username.length !== 0
        ) {
            const token = user.token
            if (token) {
                const tokenToVerify = token
                console.log("token", token);
                jwt.verify(tokenToVerify, process.env.REACT_APP_SECRET, function (err, decoded) {
                    if (err) {
                        console.log("err", err);
                        StatusAlertService.showSuccess("Nous n'avons pas pu changer le mot de passe avec sécuroté, veuillez recommencer")
                    }
                    else {
                        setIsNotValid([])
                        setIsRealoading(true)
                        axios.put(`/users/${user.id_user}`, form)
                            .then(res => {
                                console.log("res", res.data[0]);
                                console.log("env", process.env.REACT_APP_SECRET);
                                // localStorage.setItem('user', process.env.REACT_APP_SECRET
                                //     , JSON.stringify(res.data[0]))
                                StatusAlertService.showSuccess(`Les changements ont étés pris en compte`)
                                setIsRealoading(false)
                            })
                            .catch(error => {
                                StatusAlertService.showError(error.response.data)
                                setIsRealoading(false)
                            })
                    }
                })
            }

        } else {
            let newArrayOfErrors = []
            if (!validateEmail(form.mail)) {
                newArrayOfErrors.push('mail')
            }
            if (!getPasswordsMatch(form.password)) {
                newArrayOfErrors.push('password', 'password_validate')
            }
            if (form.username.trim() === '') {
                newArrayOfErrors.push('username')
            }
            if (form.password.length < 8) {
                newArrayOfErrors.push('password', 'password_validate')
            }
            setIsNotValid(newArrayOfErrors)
        }
    }

    return (
        <div className="container-account-info">
            <form>
                <div className="image-user">
                    <img src={user && user.avatar ? user.avatar : pictureAvatar} alt="avatar du compte" />
                </div>
                <InputChange
                    name="username"
                    label="Nom"
                    type="text"
                    value={user && form.username}
                    onChangeFunction={handleChange}
                />
                {isNotValid.includes('username') && <p className="information_error_message">Le champ est requis</p>}
                <InputChange
                    name="mail"
                    label="Email"
                    type="text"
                    value={user && form.mail}
                    onChangeFunction={handleChange}
                />
                {isNotValid.includes('mail') && <p className="information_error_message">Le format de cet email n'\est pas valide </p>}
                <InputChange
                    name="password"
                    label="Mot de passe"
                    type="password"
                    value={form.password}
                    onChangeFunction={handleChange}
                />
                {isNotValid.includes('password_validate') && <p className="information_error_message">Le mot de passe dois être d'au moins 8 caractères </p>}
                <Btn
                    message="Envoyer"
                    onClickFunction={(e) => checkIfFormIsValid(e)}
                >

                </Btn>
            </form>
        </div>
    )
}
