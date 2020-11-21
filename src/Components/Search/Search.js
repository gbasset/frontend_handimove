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
    const [townList, setTownList] = useState([])
    const [results, setResults] = useState()
    console.log('INITIAL_STATE', value);
    console.log('townList', townList);
    useEffect(() => {
        const timer = setTimeout(() => {
            if (value.length !== 0 && !notReload) {
                fetchData(url + value)
            } else {
                setTownList([])
            }
        }, 800)
        return () => {
            clearTimeout(timer);
        }
    }, [value])
    useEffect(() => {
        if (data) {
            setTownList(data)
        }
    }, [data])


    return (
        <div className="search_container">
            <div className="search_header">
                <section>
                    <h1>Rechercher</h1>
                    <InputSearch
                        name="town"
                        onChangeValue={(e) => handleChange(e)}
                        valueInSearchBar={value}
                        placeholder="Chercher une ville"
                    />
                    <ResultsOfSearchContainer
                        townList={townList}
                        setTownList={(e) => setTownList(e)}
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
