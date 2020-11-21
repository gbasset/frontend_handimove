import React, { useEffect, useState } from 'react'
import './Search.css'
import InputSearch from './../UI/InputSearch';
import UseInputSearch from '../../Hooks/UseInputSearch'
import UseFetch from '../../Hooks/UseFetch'
import { StatusAlertService } from 'react-status-alert'
import ResultsOfSearchContainer from './ResultsOfSearchContainer';

export default function Search() {
    const INITIAL_STATE = ""
    const { value, handleChange, notReload } = UseInputSearch(INITIAL_STATE);
    const { status, data, fetchData } = UseFetch();
    const [url, setUrl] = useState("searchby/town/")
    const [listOfSites, setListOfStites] = useState([])
    const [results, setResults] = useState()
    const [searchType, setSearchType] = useState('department')
    console.log('INITIAL_STATE', value);
    console.log('townList', listOfSites);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (value.length !== 0 && !notReload) {
                fetchData(`searchby/${searchType}/${value}`)
            } else {
                setListOfStites([])
            }
        }, 800)
        return () => {
            clearTimeout(timer);
        }
    }, [value])
    useEffect(() => {
        if (data) {
            setListOfStites(data)
        }
    }, [data])

    const onChangeFunction = (e) => {
        handleChange('', true)
        setSearchType(e.target.value)
    }
    const searchTypeList = [
        {
            value: 'town',
            label: 'Ville',
            placeholder: 'Cherchez une ville'
        },
        {
            value: 'department',
            label: 'Departement',
            placeholder: 'Cherchez un departement'
        },
        {
            value: 'regions',
            label: 'Region',
            placeholder: 'Cherchez une region'
        },
    ]
    return (
        <div className="search_container">
            <div className="search_header">
                <section>
                    <h1>Rechercher des etablissements</h1>
                    <InputSearch
                        name="town"
                        onChangeValue={(e) => handleChange(e)}
                        valueInSearchBar={value}
                        placeholder={searchTypeList.filter(elem => elem.value === searchType)[0].placeholder}
                        searchType={searchType}
                        onChangeFunction={(e) => onChangeFunction(e)}
                    />
                    <ResultsOfSearchContainer
                        searchType={searchType}
                        townList={listOfSites}
                        setTownList={(e) => setListOfStites(e)}
                        setResults={(e) => setResults(e)}
                        handleChange={(e, elem) => handleChange(e, elem)}
                    />
                </section>
            </div>
            <div>
                <h1>Résultats</h1>
                {results && results.map(x =>
                    <div>Nom : {x.name}   - Ville : {x.town}</div>
                )}
            </div>
        </div>
    )
}
