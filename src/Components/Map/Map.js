import React, { useState, useEffect, useContext } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';

export default function Map({ establishment }) {

    return (
        <MapContainer center={[establishment.latitude, establishment.longitude]} zoom={6} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {    establishment &&
                <Marker
                    position={[establishment.latitude, establishment.longitude]} key={establishment.id_etablishment}>

                </Marker>
            }
        </MapContainer>
    )
}
