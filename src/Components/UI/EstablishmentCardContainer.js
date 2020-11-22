import React from 'react'

export default function EstablishmentCardContainer({ data }) {
    return (
        <div className="establishment_container_card">
            <div>Nom : {data.name}   - Ville : {data.town}</div>
        </div>
    )
}
