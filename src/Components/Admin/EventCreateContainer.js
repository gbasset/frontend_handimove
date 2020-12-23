import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import Btn from '../UI/Btn'
import Loader from 'react-loader-spinner'
import UseForm from '../../Hooks/UseForm'
import InputChange from '../UI/InputChange'
import { StatusAlertService } from 'react-status-alert'
import Select from 'react-select';
import ListOfSearchBar from './ListOfSearchBar'
import makeAnimated from 'react-select/animated';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment'
export default function EventCreateContainer({ idOfEvent, setIdOfEvent }) {
    const animatedComponents = makeAnimated();
    const [isLoading, setIsLoading] = useState(false)
    const [form, setForm] = useState({
        name: "",
        title: "",
        address: "",
        town_id: "",
        town: "",
        id_department: "",
        id_region: "",
        description: '',
        handicaps: "",
        date_begin: "",
        date_end: "",
        event_url: ""
    })
    const today = moment()
    const [focusedInput, setFocusedInput] = useState(null)
    const [defaultSelect, setDefaultSelect] = useState()
    const [listOfTown, SetListOfTown] = useState()
    const [valueForTown, setValueForTown] = useState()
    const [noDataFoundTown, setNoDataFoundTown] = useState()
    const [listOfregions, setListOfRegions] = useState()
    const [valueForRegion, setValueForRegion] = useState()
    const [noDataFoundForRegions, SetNoDataFoundForRegions] = useState()
    const [notReloadRegion, setNotReloadRegions] = useState(true);
    const [notReload, setNotReload] = useState(true);
    const [listOfDepart, setListOfDepart] = useState()
    const [valueForDepart, setvalueForDepart] = useState()
    const [noDataFoundForDepart, setnoDataFoundForDepart] = useState()
    const [notReloadDepart, setnotReloadDepart] = useState(true);
    const [dateRange, setdateRange] = useState({
        startDate: null,
        endDate: null
    });
    const { startDate, endDate } = dateRange;
    const clickOnTown = (e, town) => {
        setForm(prevState => ({ ...prevState, town_id: e }))
        setValueForTown(town)
        SetListOfTown()
    }
    useEffect(() => {
        const timer = setTimeout(() => {
            if (valueForTown && valueForTown.length !== 0 && notReload) {
                setNoDataFoundTown(false)
                axios.get(`searchby/town/${valueForTown}`)
                    .then(res => {
                        setIsLoading(false)
                        SetListOfTown(res.data)
                        if (res.data.length === 0) {
                            setNoDataFoundTown(true)
                        }
                        setNotReload(true)
                    })
                    .catch(error => {
                        console.log("error", error);
                        StatusAlertService.showError('une erreur est survenue pendant la récupération des données')
                        setIsLoading(false)
                        setNotReload(true)
                    })
            } else {
                SetListOfTown([])
                setNotReload(true)
                setNoDataFoundTown(false)
            }
        }, 800)
        return () => {
            clearTimeout(timer);
        }
    }, [valueForTown])

    const clickOnRegion = (e, region) => {
        setForm(prevState => ({ ...prevState, id_region: e }))
        setValueForRegion(region)
        setListOfRegions()
    }
    useEffect(() => {
        const timer = setTimeout(() => {
            if (valueForRegion && valueForRegion.length !== 0 && notReloadRegion) {
                SetNoDataFoundForRegions(false)
                axios.get(`searchby/regions/${valueForRegion}`)
                    .then(res => {
                        setIsLoading(false)
                        setListOfRegions(res.data)
                        if (res.data.length === 0) {
                            SetNoDataFoundForRegions(true)
                        }
                        setNotReloadRegions(true)
                    })
                    .catch(error => {
                        console.log("error", error);
                        StatusAlertService.showError('une erreur est survenue pendant la récupération des données')
                        setIsLoading(false)
                        setNotReloadRegions(true)
                    })
            }
        }, 800)
        return () => {
            clearTimeout(timer);
        }
    }, [valueForRegion])

    const clickOnDepart = (e, depart) => {
        setForm(prevState => ({ ...prevState, id_department: e }))
        setvalueForDepart(depart)
        setListOfDepart()
    }
    useEffect(() => {
        const timer = setTimeout(() => {
            if (valueForDepart && valueForDepart.length !== 0 && notReloadDepart) {
                setnoDataFoundForDepart(false)
                axios.get(`searchby/department/${valueForDepart}`)
                    .then(res => {
                        setIsLoading(false)
                        setListOfDepart(res.data)
                        if (res.data.length === 0) {
                            setnoDataFoundForDepart(true)
                        }
                        setnotReloadDepart(true)
                    })
                    .catch(error => {
                        console.log("error", error);
                        StatusAlertService.showError('une erreur est survenue pendant la récupération des données')
                        setIsLoading(false)
                        setnotReloadDepart(true)
                    })
            } else {
                setListOfDepart([])
                setnotReloadDepart(true)
                setnoDataFoundForDepart(false)
            }
        }, 800)
        return () => {
            clearTimeout(timer);
        }
    }, [valueForDepart])
    useEffect(() => {
        if (idOfEvent) {
            setNotReload()
            setNotReloadRegions()
            setnotReloadDepart()
            axios.get(`/admin/events/${idOfEvent}`)
                .then(res => {
                    setIsLoading(false)
                    setValueForTown(res.data[0].town)
                    setValueForRegion(res.data[0].region_name)
                    setvalueForDepart(res.data[0].depart_name)
                    let begin = moment(res.data[0].date_begin)
                    let end = moment(res.data[0].date_end)
                    setdateRange({
                        startDate: begin,
                        endDate: end
                    })
                    setDefaultSelect(res.data[0].handicaps.split(';').map(val =>
                        ({ value: val, label: val })))
                    let newElement = res.data[0]
                    delete newElement.town
                    delete newElement.region_name
                    delete newElement.depart_name
                    newElement.date_begin = begin.format('YYYY-MM-DD')
                    newElement.date_end = end.format('YYYY-MM-DD')
                    setForm(newElement)
                })
                .catch(error => {
                    console.log("error", error);
                    StatusAlertService.showError('une erreur est survenue pendant la récupératio des données')
                    setIsLoading(false)
                })
        } else {
            setNotReloadRegions(true)
            setnotReloadDepart(true)
            setNotReload(true)
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

    const createEvent = () => {
        setIsLoading(true)
        let newObj = { ...form }
        delete newObj.town
        axios.post(`admin/event/`, newObj)
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
        axios.put(`/admin/event/${idOfEvent}`, form)
            .then(res => {
                StatusAlertService.showSuccess("événement modifié avec succès")
                setIsLoading(false)
                setTimeout(() => {
                    setIdOfEvent()
                }, 1000)
            })
            .catch(error => {
                StatusAlertService.showError('une erreur est survenue pendant la modification')
                setIsLoading(false)
            })
    }
    const DeleteEstablish = () => {
        setIsLoading(true)
        axios.delete(`/admin/event/${idOfEvent}`, form)
            .then(res => {
                StatusAlertService.showSuccess("événement supprimé avec succès")
                setIsLoading(false)
                setTimeout(() => {
                    setIdOfEvent()
                }, 1000)
            })
            .catch(error => {
                StatusAlertService.showError('une erreur est survenue pendant la modification')
                setIsLoading(false)
            })
    }

    useEffect(() => {
        if (startDate && endDate) {
            setForm(prevState => ({ ...prevState, date_begin: startDate.format('YYYY-MM-DD'), date_end: endDate.format('YYYY-MM-DD') }))
        }
    }, [startDate, endDate])
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
                {idOfEvent && <i className="fas fa-arrow-left returnBtn"
                    title="Retour"
                    onClick={() => setIdOfEvent()}></i>}
                <h2> {idOfEvent ? "Modification d'un événement" : "Création d'un événement"}</h2>
                <div className="event-dates-container">
                    <label>Dates de l'événement</label>
                    <DateRangePicker
                        startDate={startDate} // momentPropTypes.momentObj or null,
                        startDateId="idStartDate" // 
                        endDateId="your_unique_end_date_id" //
                        displayFormat='DD/MM/YYYY'
                        endDate={endDate} // momentPropTypes.momentObj or null,
                        isOutsideRange={date => date.isBefore(today)
                            // || date.isAfter(moment(today))
                        }
                        focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                        onFocusChange={(focused) => setFocusedInput(focused)}
                        // onClose={(dates) => { loadAnotherPeriodData(dates) }}
                        onDatesChange={(startDate, endDate) => setdateRange(startDate, endDate)}
                    />
                </div>
                <InputChange
                    name="name"
                    label="Nom"
                    value={form && form.name}
                    onChangeFunction={handleChange}
                />
                <InputChange
                    name="title"
                    label="Titre"
                    value={form && form.title}
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
                    name="event_url"
                    label="Url de l'événement"
                    value={form && form.event_url}
                    onChangeFunction={handleChange}
                />
                <InputChange
                    name="description"
                    label="Déscription"
                    value={form && form.description}
                    onChangeFunction={handleChange}
                />
                <InputChange
                    name="address"
                    label="Adresse"
                    value={form && form.address}
                    onChangeFunction={handleChange}
                />
                <div>
                    <InputChange
                        name="town"
                        label="Ville"
                        value={valueForTown && valueForTown}
                        onChangeFunction={(e) => setValueForTown(e.target.value)}
                    />
                    <ListOfSearchBar
                        searchType="town"
                        listOfSites={listOfTown}
                        noDataFound={noDataFoundTown}
                        clickOnTown={(e, t) => { clickOnTown(e, t); setNotReload() }}
                    />
                </div>
                <div>
                    <InputChange
                        name="id_department"
                        label="Département"
                        value={valueForDepart}
                        onChangeFunction={(e) => setvalueForDepart(e.target.value)}
                    />
                    <ListOfSearchBar
                        searchType="Département"
                        listOfSites={listOfDepart}
                        noDataFound={noDataFoundForDepart}
                        clickOnTown={(e, t) => { clickOnDepart(e, t); setnotReloadDepart() }}
                    />
                </div>
                <div>
                    <InputChange
                        name="id_region"
                        label="Région"
                        value={valueForRegion}
                        onChangeFunction={(e) => setValueForRegion(e.target.value)}
                    />
                    <ListOfSearchBar
                        searchType="region"
                        listOfSites={listOfregions}
                        noDataFound={noDataFoundForRegions}
                        clickOnTown={(e, t) => { clickOnRegion(e, t); setNotReloadRegions() }}
                    />
                </div>

                {
                    !idOfEvent ?
                        <div style={{ display: 'flex', margin: '10px auto' }}>
                            <Btn
                                onClickFunction={() => createEvent()}
                                message="Créer l'établissement"
                                color="success"
                            />
                        </div>
                        :
                        <div className="btn-container-modification">
                            <div style={{ display: 'flex', margin: '10px auto' }}>
                                <Btn
                                    onClickFunction={() => DeleteEstablish()}
                                    message="Supprimer l'événement"
                                    color="warning"
                                />
                            </div>
                            <div style={{ display: 'flex', margin: '10px auto' }}>
                                <Btn
                                    onClickFunction={() => changeDataEstablishment()}
                                    message="Modifier l'événement"
                                    color="success"
                                />
                            </div>
                        </div>
                }
            </div>

        </div>
    )
}
