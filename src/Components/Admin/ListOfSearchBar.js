import React from 'react'

export default function ListOfSearchBar({ listOfSites, clickOnTown, searchType, noDataFound }) {

    return (
        <div>
            <div className={listOfSites && listOfSites.length !== 0 ? "container_list_of_town-adm" :
                noDataFound ? "container_list_of_town-adm" : ""}>
                <ul>
                    {
                        !noDataFound ?
                            <>
                                {listOfSites && listOfSites.map((site, i) =>
                                    <li
                                        key={i}
                                        onClick={(e) => clickOnTown(site.id, site.name)}
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
        </div>
    )
}
