import React from 'react'
import Handicaps from './Handicaps';

export default function EstablishmentCardContainer({ data, naturOfSearch, favEstablishments, favEvents, addEventToFavorites }) {

    if (naturOfSearch === "establishment")
        return (
            <div className="establishment_container_card">
                <div> {data.name} <i className="far fa-heart"
                    onClick={(e) => addEventToFavorites(data.id_etablishment)}
                ></i></div>
                {/* <i className="fas fa-heart"></i> */}
                <div>{data.address}</div>
                <div> {data.town}  {data.zip_code}</div>
                <div>{data.region}</div>
                {data.url_website && <div>
                    <a href={data.url_website} target="_blank" rel="noopener noreferrer"> {data.url_website}</a>

                </div>}
                {data.phone && <div>Téléphone : {data.phone}</div>}
                <div>{data.category}</div>
                <Handicaps
                    handiList={data.handicaps}
                />
            </div>
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
