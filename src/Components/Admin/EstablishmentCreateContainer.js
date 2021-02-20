import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import Btn from '../UI/Btn'
import Loader from 'react-loader-spinner'
import InputChange from '../UI/InputChange'
import { StatusAlertService } from 'react-status-alert'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Modal from '../UI/Modal';
import PopinConfirm from '../UI/PopinConfirm'
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
    const [defaultSelect, setDefaultSelect] = useState();
    const [idOfPicture, setIdOfPicture] = useState();
    const [modalPicturesIsOppen, setModalPicturesIsOppen] = useState(false);
    const [popConfirm, setPopConfirm] = useState(false);
    const [images, setImages] = useState([])

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
    useEffect(() => {
        if (modalPicturesIsOppen)
            axios.get(`/images/establishment/${idOfEstablishment}`)
                .then(res => {
                    setImages(res.data)
                })
                .catch(error => {
                    StatusAlertService.showError(error.response.data)
                })
    }, [modalPicturesIsOppen])

    const deleteApicture = () => {
        setIsLoading(true)
        axios.delete(`/images/img/establish/${idOfPicture}`)
            .then(res => {
                StatusAlertService.showSuccess("Image supprimée avec succès")
                setIsLoading(false)
                axios.get(`/images/establishment/${idOfEstablishment}`)
                    .then(res => {
                        console.log("res", res.data);
                        setImages(res.data)
                        setPopConfirm(false)
                        setIdOfPicture()
                    })
                    .catch(error => {
                        StatusAlertService.showError(error.response.data)
                    })
            })
            .catch(error => {
                StatusAlertService.showError('une erreur est survenue pendant la suppression')
                setIsLoading(false)
            })
    }
    console.log("popConfirm", popConfirm);
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
            <Modal
                isOpen={modalPicturesIsOppen}
                width="1200"
                height="650"
                onClose={() => setModalPicturesIsOppen(false)}
            >
                <div className="modal_body">
                    <h1>Gestion des images d'un établissement</h1>

                    {images && images.length === 0 ?
                        <> Il n'y a pas encore d"images </>
                        :
                        <div className="images-gestion-containe">
                            {images.map(image =>
                                <div>
                                    {popConfirm &&
                                        <PopinConfirm
                                            cancel={() => setPopConfirm(false)}
                                            title={`Voullez vous vraiment supprimer cette image ?`}
                                        // message={`This banner could not be removed because it is used in the context of a campaign.`}
                                        >
                                            <div className="btnCenter">
                                                <Btn
                                                    onClickFunction={(e) => { setPopConfirm() }}
                                                    message="Annuler"
                                                    color="alert"
                                                    style="primary"
                                                />
                                                <Btn
                                                    onClickFunction={(e) => { deleteApicture() }}
                                                    message="Supprimer"
                                                    color="success"
                                                    style="outline"
                                                />
                                            </div>
                                        </PopinConfirm>
                                    }
                                    <img key={image.id} src={image.image_url} alt={` ${image.name}`} />
                                    <span>{image.image_name}</span>
                                    <Btn
                                        onClickFunction={() => { setPopConfirm(true); setIdOfPicture(image.id) }}
                                        message="Supprimer"
                                        color="alert"
                                        style="secondary"
                                    />

                                </div>
                            )}
                        </div>
                    }

                    <div className="modal_footer_center ">

                    </div>
                </div>
            </Modal>
            <div className="form-creation" >
                <div className="container-btn-modif">
                    {idOfEstablishment && <i className="fas fa-arrow-left returnBtn"
                        title="Retour"
                        onClick={() => setIdOfEstablishment()}></i>}
                    {idOfEstablishment && <i className="fas fa-cloud-upload-alt upload-icon"
                        title="Uploader Une image"
                        onClick={() => setModalIsOppen(true)}></i>}
                    {idOfEstablishment && <i className="fas fa-images"
                        title="Voir les images associées"
                        onClick={() => setModalPicturesIsOppen(true)}></i>}
                </div>
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

        </div >
    )
}
