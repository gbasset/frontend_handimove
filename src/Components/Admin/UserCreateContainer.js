import React, { useState, useEffect } from "react";
import axios from 'axios';
import Btn from '../UI/Btn'
import Loader from 'react-loader-spinner'
import { StatusAlertService } from 'react-status-alert'
import SelectCustom from '../UI/SelectCustom'

export default function UserCreateContainer({ idOfUser, setIdOfUser }) {
    const [isLoading, setIsLoading] = useState(false)
    const [form, setForm] = useState({
        username: "",
        avatar_url: "",
        id: 0,
        is_admin: "",
        login: "",
        mail: "",
        password: "",
        question: "",
        response_question: "",
        town: "",
        username: "test"
    })

    useEffect(() => {
        if (idOfUser && idOfUser) {
            axios.get(`/adminusers/user/${idOfUser}`)
                .then(res => {
                    setIsLoading(false)
                    console.log(res);
                    setForm(res.data[0])
                })
                .catch(error => {
                    console.log("error", error);
                    StatusAlertService.showError('une erreur est survenue pendant la récupération des données')
                    setIsLoading(false)
                })
        }
    }, [])

    const changeUser = () => {
        setIsLoading(true)
        const newStatus = { is_admin: form.is_admin }
        axios.put(`/adminusers/user/${idOfUser}`, newStatus)
            .then(res => {
                StatusAlertService.showSuccess("Utilisateur modifié avec succès")
                setIsLoading(false)
                setTimeout(() => {
                    setIdOfUser()
                }, 1000)
            })
            .catch(error => {
                StatusAlertService.showError('une erreur est survenue pendant la modification')
                setIsLoading(false)
            })
    }
    const deleteUser = () => {
        setIsLoading(true)
        axios.delete(`/adminusers/user/${idOfUser}`, form)
            .then(res => {
                StatusAlertService.showSuccess("Utilisateur supprimé avec succès")
                setIsLoading(false)
                setTimeout(() => {
                    setIdOfUser()
                }, 1000)
            })
            .catch(error => {
                StatusAlertService.showError('une erreur est survenue pendant la modification')
                setIsLoading(false)
            })
    }
    const optionUserRole = [{ value: 0, label: "admin" },
    { value: 1, label: "utilisateur" }]
    const handleChange = (e) => {
        setForm(prevValues => ({
            ...prevValues,
            [e.target.name]: e.target.value
        })
        )
    }
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
                {idOfUser && <i className="fas fa-arrow-left returnBtn"
                    title="Retour"
                    onClick={() => setIdOfUser()}></i>}
                <h2> Modification d'un utilisateur</h2>
                <SelectCustom
                    name="is_admin"
                    optionsList={optionUserRole}
                    label="Status"
                    value={form && form.is_admin ? form.is_admin : ""}
                    onChangeFunction={(e) => handleChange(e)}
                />
                <div className="container-user">
                    <div>
                        <i className="fas fa-user"></i>
                        @{form.username} {form.login}
                    </div>
                    <p>{form.mail}</p>
                    <p>{form.town}</p>

                </div>

                <div className="btn-container-modification">
                    <div style={{ display: 'flex', margin: '10px auto' }}>
                        <Btn
                            onClickFunction={() => deleteUser()}
                            message="Supprimer l'utilisateur"
                            color="warning"
                        />
                    </div>
                    <div style={{ display: 'flex', margin: '10px auto' }}>
                        <Btn
                            onClickFunction={() => changeUser()}
                            message="Modifier l'utilisateur"
                            color="success"
                        />
                    </div>
                </div>

            </div>

        </div>
    )
}
