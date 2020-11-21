
import React, { useEffect, useState } from 'react'
import UseFetch from '../../Hooks/UseFetch'
import { StatusAlertService } from 'react-status-alert'
export default function ResultsOfSearchContainer({ townList, setTownList, handleChange, setResults }) {


    const { status, data, fetchData } = UseFetch();
    const [idOfSearchElement, setIdOfSearchElement] = useState()

    const clickOnTown = (e) => {
        handleChange(e, true)
        setIdOfSearchElement(e)
        setTownList()
    }
    useEffect(() => {
        if (idOfSearchElement) {
            fetchData(`/search/establishment/town/${idOfSearchElement}`)
        }
    }, [idOfSearchElement])
    useEffect(() => {
        if (data) {
            setResults(data)
        }
    }, [data])

    return (
        <div className="container_list_of_town">
            <ul>
                {townList && townList.map((town, i) =>
                    <li
                        key={i}
                        onClick={(e) => clickOnTown(town.name)}
                    > {town.name} - {town.zipcode} </li>
                )}
            </ul>
        </div>
    )
}
