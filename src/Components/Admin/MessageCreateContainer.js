import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import Btn from '../UI/Btn'
import Loader from 'react-loader-spinner'
import UseForm from '../../Hooks/UseForm'
import InputChange from '../UI/InputChange'
import { StatusAlertService } from 'react-status-alert'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import SelectCustom from '../UI/SelectCustom'
import Comment from '../Comments/Comment'
export default function EstablishmentCreateContainer({ idOfMessage, setIdOfMessage }) {
    const animatedComponents = makeAnimated();
    const [isLoading, setIsLoading] = useState(false)
    const [form, setForm] = useState({
        status: "",
    })
    useEffect(() => {
        if (idOfMessage && idOfMessage) {
            axios.get(`/messages/message/${idOfMessage}`)
                .then(res => {
                    setIsLoading(false)
                    // setDefaultSelect(res.data[0].handicaps.split(';').map(val =>
                    //     ({ value: val, label: val })))
                    let newElement = res.data[0]
                    setForm(newElement)
                })
                .catch(error => {
                    console.log("error", error);
                    StatusAlertService.showError('une erreur est survenue pendant la récupération des données')
                    setIsLoading(false)
                })
        }
    }, [idOfMessage])
    const handleChange = (e) => {
        setForm(prevValues => ({
            ...prevValues,
            [e.target.name]: e.target.value
        })
        )
    }

    const changeStatusComment = () => {
        setIsLoading(true)
        const status = { status: form.status }
        axios.put(`/messages/message/${idOfMessage}`, status)
            .then(res => {
                StatusAlertService.showSuccess("Message modifié avec succès")
                setIsLoading(false)
                setTimeout(() => {
                    setIdOfMessage()
                }, 1000)
            })
            .catch(error => {
                StatusAlertService.showError('une erreur est survenue pendant la modification')
                setIsLoading(false)
            })
    }
    const deleteComment = () => {
        setIsLoading(true)
        axios.delete(`/messages/message/${idOfMessage}`, form)
            .then(res => {
                StatusAlertService.showSuccess("Message supprimé avec succès")
                setIsLoading(false)
                setTimeout(() => {
                    setIdOfMessage()
                }, 1000)
            })
            .catch(error => {
                StatusAlertService.showError('une erreur est survenue pendant la suppression')
                setIsLoading(false)
            })
    }
    const options = [{ value: "unread", label: "Non lu" },
    { value: "read", label: "lu" }]
    return (
        <div className="establishment_container">
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

            <div className="form-creation" >
                {idOfMessage && <i className="fas fa-arrow-left returnBtn"
                    title="Retour"
                    onClick={() => setIdOfMessage()}></i>}
                <h2> Validation de commentaires</h2>
                <SelectCustom
                    name="status"
                    optionsList={options}
                    label="Status"
                    value={form && form.status ? form.status : ""}
                    onChangeFunction={(e) => handleChange(e)}
                />
                <div className="container-message-admin">
                    <p> {form.message}</p>
                    <p> {form.name}</p>
                    <p> {form.contact}</p>
                    <p> {form.date}</p>
                </div>
                <div className="btn-container-modification">
                    <div style={{ display: 'flex', margin: '10px auto' }}>
                        <Btn
                            onClickFunction={() => deleteComment()}
                            message="Supprimer le message"
                            color="warning"
                        />
                    </div>
                    <div style={{ display: 'flex', margin: '10px auto' }}>
                        <Btn
                            onClickFunction={() => changeStatusComment()}
                            message="Modifier le status"
                            color="success"
                        />
                    </div>
                </div>

            </div>

        </div>
    )
}
