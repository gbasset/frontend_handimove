import React, { useEffect, useState } from 'react'
import Handicaps from './Handicaps';

export default function EstablishmentCardContainer({ data, mode, naturOfSearch, favEstablishments, favEvents, addEventToFavorites, removeEventToFav }) {
    console.log("favEstablishments", favEstablishments);
    const [arrayOfIds, setArrayOfIds] = useState()
    useEffect(() => {
        if (naturOfSearch === "establishment") {
            setArrayOfIds(favEstablishments.map(el => el.id_establishment))
        } else {
            // faire la même pour les events
        }
    }, [favEstablishments, favEvents])
    console.log("arrayOfIds", arrayOfIds)
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
                                            (e) => removeEventToFav(favEstablishments.find(el => el.id_establishment === data.id_etablishment).ID_fav) :
                                            (e) => removeEventToFav(data.ID_fav)
                                        }></i>
                                    <> sisi</>
                                </div> :
                                <div> {data.name} <i className="far fa-heart"
                                    onClick={(e) => addEventToFavorites(data.id_etablishment)}
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
                                            (e) => removeEventToFav(favEstablishments.find(el => el.id_establishment === data.id_establishment).ID_fav) :
                                            (e) => removeEventToFav(data.ID_fav)
                                        }></i>
                                    <> sisi</>
                                </div> :
                                <div> {data.name} <i className="far fa-heart"
                                    onClick={(e) => addEventToFavorites(data.id_establishment)}
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
                <div> {data.title}</div>
                <div> {data.name} <i className="far fa-heart"></i></div>
                {/* <i className="fas fa-heart"></i> */}
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
