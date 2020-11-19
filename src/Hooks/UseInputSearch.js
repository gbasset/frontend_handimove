import React, { useState } from "react";

export default function UseInputSearch(initialState) {
    const [value, setValue] = useState(initialState);
    const handleChange = event => {
        event.persist()
        console.log('eveent', event.target.name);
        setValue(prevValues => ({
            ...prevValues,
            [event.target.name]: event.target.value
        })
        )
    }
    return { handleChange, value }
}