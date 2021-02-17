import React, { useState } from "react";

export default function UseInputSearch(initialState) {
    const [valueForm, setValueForm] = useState(initialState);
    const handleChangeForm = (event) => {
        event.persist()
        setValueForm(prevValues => ({
            ...prevValues,
            [event.target.name]: event.target.value
        })
        )
    }
    return { handleChangeForm, valueForm, setValueForm }
}
