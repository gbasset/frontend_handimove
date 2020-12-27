import React from 'react'
import './SwitchAdmin.css'
export default function SwitchComments({ mode, setMode }) {
    return (
        <div className="container-switch-admin">
            <span onClick={(e) => setMode('unRead')} className={mode === "unRead" ? "span-user-edit isActivedMode" : "span-user-edit"}>Non Lu</span>
            <span onClick={(e) => setMode('read')} className={mode === "read" ? "span-user-create isActivedMode" : "span-user-create"}>Validés</span>
        </div>
    )
}
