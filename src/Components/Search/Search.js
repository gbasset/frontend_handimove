import React, { useEffect, useState, useContext } from 'react'
import './Search.css'
import InputSearch from './../UI/InputSearch';
import Modal from './../UI/Modal';
import UseInputSearch from '../../Hooks/UseInputSearch'
import Btn from './../UI/Btn'
import UseFetch from '../../Hooks/UseFetch'
import { StatusAlertService } from 'react-status-alert'
import ResultsOfSearchContainer from './ResultsOfSearchContainer';
import FavCardContainer from '../UI/FavCardContainer';
import Loader from 'react-loader-spinner'
import { Context } from '../../Context/Context'
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
export default function Search() {
    const {
        user,
        setUser
    } = useContext(Context)
    const INITIAL_STATE = ""
    const { value, handleChange, notReload } = UseInputSearch(INITIAL_STATE);
    const { status, data, fetchData } = UseFetch();
    const [listOfSites, setListOfStites] = useState([])
    const [results, setResults] = useState()
    const [results2, setResults2] = useState()
    const [searchType, setSearchType] = useState('department')
    const [naturOfSearch, setNatureOfSearch] = useState('establishment')
    const [noDataFound, setNoDataFound] = useState(false)
    const [favEstablishments, setFavEstablishment] = useState([])
    const [favEvents, setFavEvents] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [reloadTheFavEstablishment, setReloadTheFavEstablishment] = useState(false)
    const [reloadTheFavEvents, setReloadTheFavEvents] = useState(false)
    const [modalIsOppen, setModalIsOppen] = useState(false)
    const [redirectTo, setredirectTo] = useState()
    const [establishmentSelected, setEstablishmentSelected] = useState()
    const [defaultSelect, setDefaultSelect] = useState()
    const animatedComponents = makeAnimated();

    const handleSelectChange = (e) => {
        let newValue = e && e.map(elem => elem.value)
        setDefaultSelect(e)
    }
    useEffect(() => {
        if (defaultSelect && results && results.length !== 0) {
            const arrayOfValue = defaultSelect.map(x => x.value);
            let myNewArray = []
            for (let index = 0; index < results.length; index++) {
                const handi = results[index].handicaps.split(";");
                handi.forEach(elem => {
                    if (arrayOfValue.includes(elem) && !myNewArray.find(el => el.id_etablishment === results[index].id_etablishment)) {
                        myNewArray.push(results[index])
                    }
                })
            }
            setResults2(myNewArray)
        }
    }, [defaultSelect])
    const handicapsList = [
        { value: "auditif", label: "auditif" },
        { value: "mental", label: "mental" },
        { value: "visuel", label: "visuel" },
        { value: "moteur", label: "moteur" },
    ]
    useEffect(() => {
        if (user) {
            axios.get(`fav/establishments/${user.id_user}`)
                .then(res => {
                    setFavEstablishment(res.data)
                    setReloadTheFavEstablishment(false)
                })
                .catch(error => {
                    StatusAlertService.showError(error.response.data)
                })
        }
    }, [user, reloadTheFavEstablishment])
    useEffect(() => {
        if (user) {
            axios.get(`fav/event/${user.id_user}`)
                .then(res => {
                    setFavEvents(res.data)
                    setReloadTheFavEvents(false)
                })
                .catch(error => {
                    StatusAlertService.showError(error.response.data)
                })
        }
    }, [user, reloadTheFavEvents])
    const addEstablishToFavorites = (e) => {
        if (user) {
            axios.post(`fav/establishment/${user.id_user}/${e}`)
                .then(res => {
                    console.log(res.data)
                    StatusAlertService.showSuccess("Etablissement ajouté avec succès à vos favoris !")
                    setReloadTheFavEstablishment(true)
                })
                .catch(error => {
                    StatusAlertService.showError(error.response.data)
                })
        } else {
            setModalIsOppen(true)
        }
    }
    const addEventToFav = (e) => {
        if (user) {
            axios.post(`fav/event/${user.id_user}/${e}`)
                .then(res => {
                    console.log(res.data)
                    StatusAlertService.showSuccess("L'événement à été  ajouté avec succès à vos favoris !")
                    setReloadTheFavEvents(true)
                })
                .catch(error => {
                    StatusAlertService.showError(error.response.data)
                })
        } else {
            setModalIsOppen(true)
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setNoDataFound(false)
            if (value.length !== 0 && !notReload) {
                fetchData(`searchby/${searchType}/${value}`)
                setDefaultSelect()
            } else {
                setListOfStites([])
                setDefaultSelect()
            }
        }, 500)
        return () => {
            clearTimeout(timer);
        }
    }, [value])
    useEffect(() => {
        if (data) {
            if (data.length !== 0) {
                setListOfStites(data)
                setNoDataFound(false)
            } else {
                setNoDataFound(true)
            }
        }
    }, [data])

    const removeEstablishmentToFav = (e) => {
        axios.delete(`fav/establishments/${e}`)
            .then(res => {
                StatusAlertService.showSuccess("Etablissement supprimé des favoris avec succès")
                setReloadTheFavEstablishment(true)
            })
            .catch(error => {
                StatusAlertService.showError('une erreur est survenue')
            })
    }
    const removeEventsToFav = (e) => {
        axios.delete(`fav/event/${e}`)
            .then(res => {
                StatusAlertService.showSuccess("L'événement à été supprimé des favoris avec succès")
                setReloadTheFavEvents(true)
            })
            .catch(error => {
                StatusAlertService.showError('une erreur est survenue')
            })
    }
    const onChangeFunction = (e) => {
        handleChange('', true)
        setSearchType(e.target.value)
    }
    useEffect(() => {
        handleChange('', true)
        setResults()
        setResults2()
    }, [naturOfSearch])
    const searchTypeList = [
        {
            value: 'town',
            label: 'Ville',
            placeholder: 'Chercher une ville'
        },
        {
            value: 'department',
            label: 'Departement',
            placeholder: 'Chercher un departement'
        },
        {
            value: 'regions',
            label: 'Region',
            placeholder: 'Chercher une region'
        },
    ]

    if (redirectTo) {
        return <Redirect to={`${redirectTo}`} />
    }
    let dataToMap;

    if (results2 && defaultSelect !== null) {
        dataToMap = results2
    } else {
        dataToMap = results
    }

    return (
        <div className="search_container">
            <link
                rel="stylesheet"
                href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
                integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
                crossOrigin=""
            />
            <Modal
                isOpen={modalIsOppen}
                zindexMax={true}
                width="900"
                height="150"
                onClose={() => setModalIsOppen(false)}
            >
                <div className="modal_body">
                    <h3>Vous devez être connecté pour ajouter un élément aux favoris</h3>
                    <div className="modal_footer_center ">
                        <Btn
                            onClickFunction={() => setredirectTo("/authentication")}
                            message="Me connecter"
                            color="success"
                        />
                        <Btn
                            onClickFunction={() => setredirectTo("/register")}
                            message="Créer un compte"
                        />
                    </div>
                </div>
            </Modal>

            <div className="search_header">
                <section>
                    <div className="btn_type_of_search_container">
                        <button className={naturOfSearch === "establishment" ? "isActive_btn" : ""}
                            onClick={(e) => setNatureOfSearch('establishment')}
                        > Etablissements</button>
                        <button className={naturOfSearch === "events" ? "isActive_btn" : ""}
                            onClick={(e) => setNatureOfSearch('events')}> Evénements</button>
                    </div>
                    <div className="search_title">
                        <h1>Rechercher des {naturOfSearch === "events" ? "événements" : "établissements"}</h1>
                    </div>
                    <InputSearch
                        name="site"
                        onChangeValue={(e) => handleChange(e)}
                        valueInSearchBar={value}
                        placeholder={searchTypeList.filter(elem => elem.value === searchType)[0].placeholder}
                        searchType={searchType}
                        onChangeFunction={(e) => onChangeFunction(e)}
                    />
                    <ResultsOfSearchContainer
                        noDataFound={noDataFound}
                        searchType={searchType}
                        naturOfSearch={naturOfSearch}
                        listOfSites={listOfSites}
                        setListOfStites={(e) => setListOfStites(e)}
                        setResults={(e) => setResults(e)}
                        setIsLoading={(e) => setIsLoading(e)}
                        handleChange={(e, elem) => handleChange(e, elem)}
                        value={value}
                    />
                    {
                        isLoading &&
                        <Loader
                            type="TailSpin"
                            color="#ffd0ad"
                            height={100}
                            width={100}
                            timeout={3000}
                        />
                    }
                </section>
            </div>
            <div className="containerSearch">
                {
                    dataToMap && dataToMap.length !== 0 && <>
                        <h1> {dataToMap.length > 1 ? `${dataToMap.length} résultats` : `${dataToMap.length} résultat`} </h1>
                        <Select
                            closeMenuOnSelect={true}
                            value={defaultSelect && defaultSelect}
                            components={animatedComponents}
                            menuPortalTarget={document.body}
                            styles={{ menuPortal: base => ({ ...base, zIndex: 10000 }) }}
                            // menuPosition={"fixed"}
                            isMulti
                            options={handicapsList}
                            placeholder={"Filtrer par type de handicap"}
                            onChange={handleSelectChange}
                        /> </>
                }

                <div className="establishment_list">
                    {dataToMap && dataToMap.map((x, i) =>
                        <FavCardContainer
                            data={x}
                            key={i}
                            naturOfSearch={naturOfSearch}
                            favEstablishments={favEstablishments}
                            favEvents={favEvents}
                            addEstablishToFavorites={(e) => addEstablishToFavorites(e)}
                            removeEstablishmentToFav={(e) => removeEstablishmentToFav(e)}
                            addEventToFav={(e) => addEventToFav(e)}
                            removeEventsToFav={(e) => removeEventsToFav(e)}
                            mode="search"
                        />

                    )}
                    {
                        dataToMap && dataToMap.length === 0 &&
                        <> Nous n'avons pas de résultats pour cette recherche </>
                    }
                </div>
            </div>
        </div>
    )
}
