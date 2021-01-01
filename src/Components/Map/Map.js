import React, { useState, useEffect, useContext } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';


export default function Map({ array, isCard }) {

    return (
        <MapContainer center={isCard ? [array[0].latitude, array[0].longitude] : [48.866667, 2.333333]} zoom={6} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {    array && array.map(elem =>
                <Marker
                    position={[elem.latitude, elem.longitude]} key={elem.ID}>
                    <Popup>
                        <span className="name-mdph">{elem.name}</span>
                        <div className="mdph-contain">
                            <div>{elem.address}</div>
                            <div>{elem.town}</div>
                            <div>{elem.zip_code}</div>
                        </div>
                    </Popup>
                </Marker>
            )
            }
        </MapContainer>
    )
}
