import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import Btn from '../UI/Btn'
import Loader from 'react-loader-spinner'
import UseForm from '../../Hooks/UseForm'
import InputChange from '../UI/InputChange'
import { StatusAlertService } from 'react-status-alert'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
export default function EstablishmentCreateContainer({ idOfEstablishment, setIdOfEstablishment, setModalIsOppen }) {
    const animatedComponents = makeAnimated();
    const [isLoading, setIsLoading] = useState(false)
    const [form, setForm] = useState({
        name: "",
        address: "",
        url_website: "",
        phone: "",
        zip_code: "",
        region: "",
        town: "",
        department: "",
        category: "",
        activity: "",
        handicaps: "",
        siret: "",
    })
    const [defaultSelect, setDefaultSelect] = useState()

    useEffect(() => {
        if (idOfEstablishment && idOfEstablishment) {
            axios.get(`/admin/establisments/${idOfEstablishment}`)
                .then(res => {
                    setIsLoading(false)
                    setDefaultSelect(res.data[0].handicaps.split(';').map(val =>
                        ({ value: val, label: val })))
                    let newElement = res.data[0]
                    setForm(newElement)
                })
                .catch(error => {
                    console.log("error", error);
                    StatusAlertService.showError('une erreur est survenue pendant la récupératio des données')
                    setIsLoading(false)
                })
        }
    }, [])
    const handleChange = (e) => {
        setForm(prevValues => ({
            ...prevValues,
            [e.target.name]: e.target.value
        })
        )
    }
    const handleSelectChange = (e) => {
        let newValue = e && e.map(elem => elem.value)
        setDefaultSelect(e)
        setForm(prevState => ({ ...prevState, handicaps: newValue ? newValue.join(';') : '' }))
    }
    const handicapsList = [
        { value: "auditif", label: "auditif" },
        { value: "mental", label: "mental" },
        { value: "visuel", label: "visuel" },
        { value: "moteur", label: "moteur" },
    ]
    console.log("form", form);
    const createEstablishment = () => {
        setIsLoading(true)
        axios.post(`admin/establisments/`, form)
            .then(res => {
                StatusAlertService.showSuccess("Etablissement créé avec succès")
                setIsLoading(false)
            })
            .catch(error => {
                StatusAlertService.showError('une erreur est survenue pendant la création')
                setIsLoading(false)
            })
    }
    const changeDataEstablishment = () => {
        setIsLoading(true)
        axios.put(`/admin/establisments/${idOfEstablishment}`, form)
            .then(res => {
                StatusAlertService.showSuccess("Etablissement modifié avec succès")
                setIsLoading(false)
                setTimeout(() => {
                    setIdOfEstablishment()
                }, 1000)
            })
            .catch(error => {
                StatusAlertService.showError('une erreur est survenue pendant la modification')
                setIsLoading(false)
            })
    }
    const DeleteEstablish = () => {
        setIsLoading(true)
        axios.delete(`/admin/establisments/${idOfEstablishment}`, form)
            .then(res => {
                StatusAlertService.showSuccess("Etablissement supprimé avec succès")
                setIsLoading(false)
                setTimeout(() => {
                    setIdOfEstablishment()
                }, 1000)
            })
            .catch(error => {
                StatusAlertService.showError('une erreur est survenue pendant la modification')
                setIsLoading(false)
            })
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
                {idOfEstablishment && <i className="fas fa-arrow-left returnBtn"
                    title="Retour"
                    onClick={() => setIdOfEstablishment()}></i>}
                {idOfEstablishment && <i className="fas fa-cloud-upload-alt"
                    title="Uploader Une image"
                    onClick={() => setModalIsOppen(true)}></i>}

                <h2> {idOfEstablishment ? "Modification d'un établissement" : "Création d'un établissement"}</h2>
                <InputChange
                    name="name"
                    label="Nom"
                    value={form && form.name}
                    onChangeFunction={handleChange}
                />
                <label htmlFor="Handicaps">Handicap</label>
                <Select
                    closeMenuOnSelect={true}
                    value={defaultSelect && defaultSelect}
                    components={animatedComponents}
                    menuPortalTarget={document.body}
                    styles={{ menuPortal: base => ({ ...base, zIndex: 10000 }) }}
                    menuPosition={"fixed"}
                    isMulti
                    options={handicapsList}
                    placeholder={"Rechercher un handicap"}
                    onChange={handleSelectChange}
                />
                <InputChange
                    name="category"
                    label="Categorie"
                    value={form && form.category}
                    onChangeFunction={handleChange}
                />
                <InputChange
                    name="activity"
                    label="Activités"
                    value={form && form.activity}
                    onChangeFunction={handleChange}
                />

                <InputChange
                    name="address"
                    label="Addresse"
                    value={form && form.address}
                    onChangeFunction={handleChange}
                />
                <InputChange
                    name="town"
                    label="Ville"
                    value={form && form.town}
                    onChangeFunction={handleChange}
                />

                <InputChange
                    name="url_website"
                    label="Url du site"
                    value={form && form.url_website}
                    onChangeFunction={handleChange}
                />

                <InputChange
                    name="phone"
                    label="Téléphone"
                    value={form && form.phone}
                    onChangeFunction={handleChange}
                />
                <InputChange
                    name="zip_code"
                    label="Code postal"
                    value={form && form.zip_code}
                    onChangeFunction={handleChange}
                />

                <InputChange
                    name="region"
                    label="Région"
                    value={form && form.region}
                    onChangeFunction={handleChange}
                />

                <InputChange
                    name="department"
                    label="Département"
                    value={form && form.department}
                    onChangeFunction={handleChange}
                />

                <InputChange
                    name="siret"
                    label="siret"
                    value={form && form.siret}
                    onChangeFunction={handleChange}
                />
                {
                    !idOfEstablishment ?
                        <div style={{ display: 'flex', margin: '10px auto' }}>
                            <Btn
                                onClickFunction={() => createEstablishment()}
                                message="Créer l'établissement"
                                color="success"
                            />
                        </div>
                        :
                        <div className="btn-container-modification">
                            <div style={{ display: 'flex', margin: '10px auto' }}>
                                <Btn
                                    onClickFunction={() => DeleteEstablish()}
                                    message="Supprimer l'établissement"
                                    color="warning"
                                />
                            </div>
                            <div style={{ display: 'flex', margin: '10px auto' }}>
                                <Btn
                                    onClickFunction={() => changeDataEstablishment()}
                                    message="Modifier l'établissement"
                                    color="success"
                                />
                            </div>
                        </div>
                }
            </div>

        </div>
    )
}
