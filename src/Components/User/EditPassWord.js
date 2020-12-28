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

export default function EditPassWord() {
    const {
        user,
    } = useContext(Context)

    const [isNotValid, setIsNotValid] = useState([])
    const [isRealoading, setIsRealoading] = useState(false)

    const [form, setForm] = useState({
        user_password: "",
        password2: ""
    })
    const handleChange = (e) => {
        setForm(prevValues => ({
            ...prevValues,
            [e.target.name]: e.target.value
        })
        )
    }
    console.log("form", form);
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
    function checkIfFormIsValid(e) {
        e.preventDefault()
        if (getPasswordsMatch(form.user_password, form.password2) && form.user_password.length >= 8
        ) {
            const token = user.token
            if (token) {
                const tokenToVerify = token
                jwt.verify(tokenToVerify, process.env.REACT_APP_SECRET, function (err, decoded) {
                    if (err) {
                        console.log("err", err);
                        StatusAlertService.showSuccess("Nous n'avons pas pu changer le mot de passe avec sécurité, veuillez recommencer")
                    }
                    else {
                        setIsNotValid([])
                        setIsRealoading(true)
                        axios.put(`/users/pass/${user.id_user}`, form)
                            .then(res => {
                                StatusAlertService.showSuccess(`Le mot de passe a été changé avec succès`)
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

            if (form.password.trim() === '') {
                newArrayOfErrors.push('username')
            }
            if (form.user_password.length < 8) {
                newArrayOfErrors.push('password', 'password_validate')
            }
            if (form.password2.length < 8) {
                newArrayOfErrors.push('password', 'password_validate')
            }
            setIsNotValid(newArrayOfErrors)
        }
    }

    return (
        <div className="password-form-container">
            <form>
                <div className="center-div">
                    Vous pouvez changer votre mot de passe avec ce formulaire.
                    Il dois cependant être constitué d'au minimum 8 caractères.
                </div>
                <InputChange
                    name="user_password"
                    label="Mot de passe"
                    type="password"
                    value={form.user_password}
                    onChangeFunction={handleChange}
                />
                <InputChange
                    name="password2"
                    label="Valider le mot de passe"
                    type="password"
                    value={form.password2}
                    onChangeFunction={handleChange}
                />
                {isNotValid.includes('password') && <p className="information_error_message">Les mots de passes doivent êtres identiques et comporter au moins 8 caractères </p>}
                <div className="container-btn">
                    <Btn
                        message="Envoyer"
                        onClickFunction={(e) => checkIfFormIsValid(e)}
                    >
                    </Btn>
                </div>
            </form>
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
        </div>
    )
}
