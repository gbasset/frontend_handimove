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
export default function EstablishmentCreateContainer({ idOfComment, setIdOfComment }) {
    const animatedComponents = makeAnimated();
    const [isLoading, setIsLoading] = useState(false)
    const [form, setForm] = useState({
        status: "",
    })
    const [defaultSelect, setDefaultSelect] = useState()
    console.log("idOfComment", idOfComment);
    useEffect(() => {
        if (idOfComment && idOfComment) {
            console.log("idOfComment", idOfComment);
            axios.get(`/admin/comment/${idOfComment}`)
                .then(res => {
                    setIsLoading(false)
                    console.log("res", res.data);
                    // setDefaultSelect(res.data[0].handicaps.split(';').map(val =>
                    //     ({ value: val, label: val })))
                    let newElement = res.data[0]
                    setForm(newElement)
                })
                .catch(error => {
                    console.log("error", error);
                    StatusAlertService.showError('une erreur est survenue pendant la récupératio des données')
                    setIsLoading(false)
                })
        }
    }, [idOfComment])
    const handleChange = (e) => {
        setForm(prevValues => ({
            ...prevValues,
            [e.target.name]: e.target.value
        })
        )
    }
    console.log("form", form);

    const changeStatusComment = () => {
        setIsLoading(true)
        const status = { status: form.status_comment }
        console.log("status", status);
        axios.put(`/admin/comment/${idOfComment}`, status)
            .then(res => {
                StatusAlertService.showSuccess("Commentaire modifié avec succès")
                setIsLoading(false)
                setTimeout(() => {
                    setIdOfComment()
                }, 1000)
            })
            .catch(error => {
                StatusAlertService.showError('une erreur est survenue pendant la modification')
                setIsLoading(false)
            })
    }
    const deleteComment = () => {
        setIsLoading(true)
        axios.delete(`/admin/comment/${idOfComment}`, form)
            .then(res => {
                StatusAlertService.showSuccess("Commentaire supprimé avec succès")
                setIsLoading(false)
                setTimeout(() => {
                    setIdOfComment()
                }, 1000)
            })
            .catch(error => {
                StatusAlertService.showError('une erreur est survenue pendant la suppression')
                setIsLoading(false)
            })
    }
    const optionCommentValidate = [{ value: 0, label: "visible" },
    { value: 1, label: "invisible" }]
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
                {idOfComment && <i className="fas fa-arrow-left returnBtn"
                    title="Retour"
                    onClick={() => setIdOfComment()}></i>}

                <h2> Validation de commentaires</h2>
                <SelectCustom
                    name="status_comment"
                    optionsList={optionCommentValidate}
                    label="Status"
                    value={form && form.status_comment ? form.status_comment : ""}
                    onChangeFunction={(e) => handleChange(e)}

                />
                <div>
                    <Comment
                        comment={form}
                    />
                </div>
                <div className="btn-container-modification">
                    <div style={{ display: 'flex', margin: '10px auto' }}>
                        <Btn
                            onClickFunction={() => deleteComment()}
                            message="Supprimer le commentaire"
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
