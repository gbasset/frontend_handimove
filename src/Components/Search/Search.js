import React, { useEffect, useState, useContext } from 'react'
import './Search.css'
import InputSearch from './../UI/InputSearch';
import UseInputSearch from '../../Hooks/UseInputSearch'
import UseFetch from '../../Hooks/UseFetch'
import { StatusAlertService } from 'react-status-alert'
import ResultsOfSearchContainer from './ResultsOfSearchContainer';
import EstablishmentCardContainer from './../UI/EstablishmentCardContainer';
import Loader from 'react-loader-spinner'
import { Context } from '../../Context/Context'
import axios from 'axios';
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
    const [searchType, setSearchType] = useState('department')
    const [naturOfSearch, setNatureOfSearch] = useState('establishment')
    const [noDataFound, setNoDataFound] = useState(false)
    const [favEstablishments, setFavEstablishment] = useState([])
    const [favEvents, setFavEvents] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [reloadTheFavEstablishment, setReloadTheFavEstablishment] = useState(false)

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
                })
                .catch(error => {
                    StatusAlertService.showError(error.response.data)
                })
        }
    }, [user])
    const addEventToFavorites = (e) => {
        axios.post(`fav/establishment/${user.id_user}/${e}`)
            .then(res => {
                console.log(res.data)
                StatusAlertService.showSuccess("Etablissement ajouté avec succès à vos favoris !")
                setReloadTheFavEstablishment(true)
            })
            .catch(error => {
                StatusAlertService.showError(error.response.data)
            })
    }

    console.log("favEstablishments", favEstablishments);
    console.log("favEvents", favEvents);

    useEffect(() => {
        const timer = setTimeout(() => {
            setNoDataFound(false)
            if (value.length !== 0 && !notReload) {
                fetchData(`searchby/${searchType}/${value}`)
            } else {
                setListOfStites([])
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

    const onChangeFunction = (e) => {
        handleChange('', true)
        setSearchType(e.target.value)
    }
    useEffect(() => {
        handleChange('', true)
        setResults()
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


    return (
        <div className="search_container">
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
            <div>
                <h1>Résultats</h1>
                <div className="establishment_list">
                    {results && results.map((x, i) =>
                        <EstablishmentCardContainer
                            data={x}
                            key={i}
                            naturOfSearch={naturOfSearch}
                            favEstablishments={favEstablishments}
                            favEvents={favEvents}
                            addEventToFavorites={(e) => addEventToFavorites(e)}
                        />

                    )}
                    {
                        results && results.length === 0 &&
                        <> Nous n'avons pas de résultats pour cette recherche </>
                    }
                </div>
            </div>
        </div>
    )
}
