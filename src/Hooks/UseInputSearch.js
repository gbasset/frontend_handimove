import React, { useState, useEffect } from "react";

export default function UseInputSearch(initialState) {
    const [value, setValue] = useState(initialState);
    const [notReload, setNotReload] = useState();

    const handleChange = (event, reload) => {
        if (typeof event === 'string' && reload) {
            setNotReload(true)
            setValue(event)
        } else {
            setNotReload(false)
            setValue(event.target.value)
        }
    }
    return { handleChange, value, setValue, notReload }
}