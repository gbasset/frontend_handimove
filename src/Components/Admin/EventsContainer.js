import React, { useState, useEffect, useContext } from "react";
import SwitchAdmin from '../UI/SwitchAdmin'
export default function EventsContainer() {
    const [mode, setMode] = useState("Edit")
    return (
        <div>
            <SwitchAdmin
                mode={mode}
                setMode={(e) => setMode(e)}
            />
        </div>
    )
}
