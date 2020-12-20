import React, { useState, useEffect, useContext } from "react";
import { StatusAlertService } from 'react-status-alert'
import InputChange from '../UI/InputChange'
import { Context } from '../../Context/Context'
import Btn from '../UI/Btn'
import axios from 'axios';
export default function FormComment({ idEstablishment, setNewCommentIsOppen }) {
    const {
        user,
        setUser
    } = useContext(Context)

    const [form, setForm] = useState({
        id_user: user.id_user,
        name: "",
        comment: "",
    })
    const handleChange = (e) => {
        setForm(prevValues => ({
            ...prevValues,
            [e.target.name]: e.target.value
        })
        )
    }
    const sendComment = (e) => {
        axios.post(`/comments/user/${user.id_user}/${idEstablishment}`, form)
            .then(res => {
                console.log(res.data)
                StatusAlertService.showSuccess("Commentaire ajouté avec succès, nous allons l'étudier pour le mettre en ligne")
                setForm({
                    id_user: user.id_user,
                    name: "",
                    comment: "",
                })
                setNewCommentIsOppen(false)
            })
            .catch(error => {
                StatusAlertService.showError(error.response.data)
            })
    }
    return (
        <div>
            <h3>Ajouter un commentaire</h3>
            <div>
                <InputChange
                    name="name"
                    label="Nom"
                    value={user && form.name}
                    onChangeFunction={handleChange}
                />
                <InputChange
                    name="comment"
                    label="Commentaire"
                    value={user && form.comment}
                    onChangeFunction={handleChange}
                />
            </div>
            <Btn
                onClickFunction={(e) => sendComment()}
                message="Envoyer"

            />
            <Btn
                onClickFunction={(e) => setNewCommentIsOppen()}
                message="Annuler"
                color="alert"
            />


        </div>
    )
}
