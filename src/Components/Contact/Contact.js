import React, { useState, useEffect, useContext } from "react";
import { Context } from '../../Context/Context'
import UseForm from '../../Hooks/UseForm'
import InputChange from '../UI/InputChange'
import TextAreaCustom from '../UI/TextAreaCustom'
import SelectCustom from '../UI/SelectCustom'
import Btn from '../UI/Btn'
import Loader from 'react-loader-spinner'
import { StatusAlertService } from 'react-status-alert'

import './Contact.css'
import axios from 'axios';
import moment from 'moment'

export default function Contact() {
    const {
        user,
        setUser
    } = useContext(Context)
    const [form, setForm] = useState({
        name: "",
        subject: "",
        message: "",
        contact: "",
    })
    const { handleChangeForm, valueForm, setValueForm } = UseForm(form);

    const [isLoading, setIsLoading] = useState(false)
    const [isSend, setIsSend] = useState(false)
    useEffect(() => {
        setForm(valueForm)
    }, [valueForm])
    useEffect(() => {
        if (user) {
            setValueForm({ ...form, contact: user.mail, name: user.username, subject: "Utilisateur" })
        }
    }, [user])

    function checkRequired(inputArray) {
        for (let i = 0; i < Object.values(inputArray).length; i++) {
            if (Object.values(inputArray)[i] && Object.values(inputArray)[i].toString().trim().length === 0) {
                return false
            } else if (!Object.values(inputArray)[i]) {
                return false
            }
        }
        return true
    }
    const senMessage = () => {
        setIsLoading(true)
        const message = user ? { ...form, user_id: user.id_user } : { ...form, user_id: '' }
        axios.post(`/messages/send`, message)
            .then(res => {
                StatusAlertService.showSuccess("Message envoyé avec succès")
                setIsLoading(false)
                setIsSend(true)
            })
            .catch(error => {
                StatusAlertService.showError('une erreur est survenue pendant l\'envoi')
                setIsLoading(false)
            })
    }
    const options = [
        { value: "Demande de création d'établissement", label: "Je suis un établissement ..." },
        { value: "Demande de création d'événement", label: "Je suis organisateur d'événement ..." },
        { value: "Utilisateur", label: "Je suis un utilisateur ..." },
    ]

    return (
        <div className="form-contact-container">
            {!isSend &&
                <>
                    <InputChange
                        name="name"
                        label="Nom"
                        type="text"
                        value={valueForm.name}
                        onChangeFunction={handleChangeForm}
                    />
                    {!user &&
                        <InputChange
                            name="contact"
                            label="Contact"
                            type="mail"
                            value={valueForm.contact}
                            onChangeFunction={handleChangeForm}
                        />
                    }

                    <label>Sujet</label>
                    <SelectCustom
                        name="subject"
                        defaultValueDisabled={{ value: "", label: "" }}
                        optionsList={options}
                        value={form && form.subject ? form.subject : ""}
                        onChangeFunction={(e) => handleChangeForm(e)}
                    />
                    <label>Message</label>
                    <TextAreaCustom
                        name="message"
                        value={form.message ? form.message : ""}
                        onChangeFunction={handleChangeForm}
                    />
                    <div className="btn-send-message">
                        <Btn
                            onClickFunction={form.message.length !== 0 && form.name.length !== 0 ? () => senMessage() : function () { }}
                            message="Envoyer"
                            disabled={form.message.length !== 0 && form.name.length !== 0 ? false : true}
                        />
                    </div>
                </>
            }
            {
                isSend && <>
                    <div className="center-div">
                        Merci pour votre message, nous allons l'étudier prochainement .
                    </div>
                </>
            }
            {
                isLoading &&
                <div className="center-div">
                    <Loader
                        type="TailSpin"
                        color="#ffd0ad"
                        height={100}
                        width={100}
                        timeout={3000}
                    />
                </div>
            }
        </div>
    )
}
