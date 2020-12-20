import React from 'react'
import './SwitchAdmin.css'
export default function SwitchAdmin({ mode, setMode }) {
    return (
        <div className="container-switch-admin">
            <span onClick={(e) => setMode('Edit')} className={mode === "Edit" ? "span-user-edit isActivedMode" : "span-user-edit"}>Edition</span>
            <span onClick={(e) => setMode('Create')} className={mode === "Create" ? "span-user-create isActivedMode" : "span-user-create"}>Création</span>
        </div>
    )
}
