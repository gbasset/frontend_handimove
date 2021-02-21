import React, { useState, useEffect, useContext } from "react";
import { Context } from '../../Context/Context'
import Input from './../UI/Input';
import './AccountInformations.css'
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
        username: '',
        mail: '',
        avatar_url: ''
    })
    useEffect(() => {
        setForm({
            username: user && user.username,
            mail: user && user.mail,
            avatar_url: user && user.avatar_url
        })
    }, [user])
    const handleChange = (e) => {
        setForm(prevValues => ({
            ...prevValues,
            [e.target.name]: e.target.value
        })
        )
    }

    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function checkIfFormIsValid(e) {
        e.preventDefault()
        if (validateEmail(form.mail) && form.username.length !== 0
        ) {
            const token = user.token
            if (token) {
                const tokenToVerify = token
                jwt.verify(tokenToVerify, process.env.REACT_APP_SECRET, function (err, decoded) {
                    if (err) {
                        console.log("err", err);
                        StatusAlertService.showSuccess("Nous n'avons pas pu changer vos informations avec sécurité, veuillez recommencer")
                    }
                    else {
                        setIsNotValid([])
                        setIsRealoading(true)
                        axios.put(`/users/${user.id_user}`, form)
                            .then(res => {
                                const userNewData = { token: token, ...res.data[0] }
                                localStorage.setItem('user', JSON.stringify(userNewData))
                                setUser(userNewData)
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
            if (form.username.trim() === '') {
                newArrayOfErrors.push('username')
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
                <Input
                    name="role"
                    label="Role"
                    value={user && user.is_admin === 1 ? "Utilisateur" : "Admin"}
                />
                <div style={{ display: 'flex', margin: 'auto' }}>
                    <Btn
                        message="Envoyer"
                        onClickFunction={(e) => checkIfFormIsValid(e)}
                    >
                    </Btn>
                </div>
            </form>
        </div>
    )
}
