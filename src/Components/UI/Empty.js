import React from 'react'

export default function Empty({ name }) {
    return (
        <div className="empty-zone">
            <p>Vous n'avez pas encore {name}</p>
        </div>
    )
}
