import React, { useEffect, useState } from 'react'
import Handicaps from './Handicaps';

export default function EstablishmentCardContainer({ data, mode, naturOfSearch, favEstablishments, favEvents, addEventToFav, removeEventsToFav, addEstablishToFavorites, removeEstablishmentToFav }) {

    const [arrayOfIds, setArrayOfIds] = useState()
    useEffect(() => {
        if (naturOfSearch === "establishment") {
            setArrayOfIds(favEstablishments.map(el => el.id_establishment))
        } else {
            setArrayOfIds(favEvents.map(el => el.id_event))
        }
    }, [favEstablishments, favEvents, naturOfSearch])

    if (naturOfSearch === "establishment")
        return (
            <div className="establishment_container_card">
                { mode === "search" ?
                    <>
                        {
                            arrayOfIds && arrayOfIds.includes(data.id_etablishment) ?
                                <div>
                                    {data.name}
                                    <i className="fas fa-heart"
                                        onClick={mode === "search" ?
                                            (e) => removeEstablishmentToFav(favEstablishments.find(el => el.id_establishment === data.id_etablishment).ID_fav) :
                                            (e) => removeEstablishmentToFav(data.ID_fav)
                                        }></i>
                                </div> :
                                <div> {data.name} <i className="far fa-heart"
                                    onClick={(e) => addEstablishToFavorites(data.id_etablishment)}
                                ></i>
                                </div>
                        }
                    </>
                    :
                    <>
                        {
                            arrayOfIds && arrayOfIds.includes(data.id_establishment) ?
                                <div>
                                    {data.name}
                                    <i className="fas fa-heart"
                                        onClick={mode === "search" ?
                                            (e) => removeEstablishmentToFav(favEstablishments.find(el => el.id_establishment === data.id_establishment).ID_fav) :
                                            (e) => removeEstablishmentToFav(data.ID_fav)
                                        }></i>
                                </div> :
                                <div> {data.name} <i className="far fa-heart"
                                    onClick={(e) => addEstablishToFavorites(data.id_establishment)}
                                ></i>
                                </div>
                        }
                    </>
                }
                <div>{data.address}</div>
                <div> {data.town}  {data.zip_code}</div>
                <div>{data.region}</div>
                {
                    data.url_website && <div>
                        <a href={data.url_website} target="_blank" rel="noopener noreferrer"> {data.url_website}</a>
                    </div>
                }
                { data.phone && <div>Téléphone : {data.phone}</div>}
                <div>{data.category}</div>
                <Handicaps
                    handiList={data.handicaps}
                />
            </div >
        )
    else {
        return (
            <div className="establishment_container_card">
                { mode === "search" ?
                    <>
                        {
                            arrayOfIds && arrayOfIds.includes(data.id_event) ?
                                <div>
                                    {data.name}
                                    <i className="fas fa-heart"
                                        onClick={mode === "search" ?
                                            (e) => removeEventsToFav(favEvents.find(el => el.id_event === data.id_event).ID_fav) :
                                            (e) => removeEventsToFav(data.ID_fav)
                                        }></i>
                                </div> :
                                <div> {data.name} <i className="far fa-heart"
                                    onClick={(e) => addEventToFav(data.id_event)}
                                ></i>
                                </div>
                        }
                    </>
                    :
                    <>
                        {
                            arrayOfIds && arrayOfIds.includes(data.id_event) ?
                                <div>
                                    {data.name}
                                    <i className="fas fa-heart"
                                        onClick={mode === "search" ?
                                            (e) => removeEventsToFav(favEvents.find(el => el.id_event === data.id_event).ID_fav) :
                                            (e) => removeEventsToFav(data.ID_fav)
                                        }></i>
                                </div> :
                                <div> {data.name} <i className="far fa-heart"
                                    onClick={(e) => addEventToFav(data.id_event)}
                                ></i>
                                </div>
                        }
                    </>
                }
                <div>{data.date_begin} - {data.date_end} </div>
                <div>{data.address}</div>
                <div> {data.town} </div>
                <div>{data.region_name}</div>
                {data.event_url && <div>
                    <a href={data.event_url} target="_blank" rel="noopener noreferrer"> {data.event_url}</a>
                </div>}
                {data.phone && <div>Téléphone : {data.phone}</div>}
                <div> Description : {data.description}</div>
                <Handicaps
                    handiList={data.handicaps}
                />
            </div>
        )
    }

}
