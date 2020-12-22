
import React, { useEffect, useState } from 'react'
import UseFetch from '../../Hooks/UseFetch'
import { StatusAlertService } from 'react-status-alert'

export default function ResultsOfSearchContainer({ listOfSites, setListOfStites, handleChange, setResults, searchType, naturOfSearch, noDataFound, setIsLoading }) {

    const { status, data, fetchData } = UseFetch();
    const [idOfSearchElement, setIdOfSearchElement] = useState()

    const clickOnTown = (e) => {
        handleChange(e, true)
        setIdOfSearchElement(e)
        setListOfStites()
    }
    useEffect(() => {
        if (idOfSearchElement) {
            setIsLoading(true)
            if (naturOfSearch === "events") {
                fetchData(`/events/${searchType}/${idOfSearchElement}`)
            } else {
                fetchData(`/search/establishment/${searchType}/${idOfSearchElement}`)
            }
        }
    }, [idOfSearchElement])
    useEffect(() => {
        if (data) {
            setIsLoading(false)
            if (data.length !== 0) {
                StatusAlertService.showSuccess(`Nous avons trouvé ${data.length} résultats pour votre recherche `)
                setResults(data)
            } else {
                StatusAlertService.showWarning(`Nous n'avons pas de résultats pour votre recherche `)
                setResults(data)
            }
        }
    }, [data])

    return (
        <div className="container_list_of_town">
            <ul>
                {
                    !noDataFound ?
                        <>
                            {listOfSites && listOfSites.map((site, i) =>
                                <li
                                    key={i}
                                    onClick={(e) => clickOnTown(site.name)}
                                > {site.name}
                                    {searchType === 'town' && <> - {site.zipcode} </>}
                                </li>
                            )}
                        </>
                        :
                        <li>Il n'y a pas de résults pour cette recherche, veuillez verifier l'orthographe</li>
                }
            </ul>
        </div>
    )
}
