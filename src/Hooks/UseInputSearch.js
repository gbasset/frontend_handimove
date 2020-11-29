import React, { useState, useEffect } from "react";

export default function UseInputSearch(initialState) {
    const [value, setValue] = useState(initialState);
    const [nameSite, setNameSite] = useState();
    const [notReload, setNotReload] = useState();

    const handleChange = (event, reload, siteName) => {
        if (typeof event === 'number') {
            setValue(event)
            setNameSite(siteName)
            setNotReload(false)
        } else {
            if (typeof event === 'string' && reload) {
                setNotReload(true)
                setValue(event)
            } else {
                setNotReload(false)
                setValue(event.target.value)
            }
        }
    }
    return { handleChange, value, setValue, notReload, nameSite, setNameSite }
}