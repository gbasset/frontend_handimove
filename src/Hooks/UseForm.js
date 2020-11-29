import React, { useState, useEffect } from "react";

export default function UseInputSearch(initialState) {
    const [valueForm, setValueForm] = useState(initialState);

    const handleChangeForm = (event) => {
        const newElementToChange = initialState
        newElementToChange[event.target.name] = event.target.value
        console.log("newElementToChange", newElementToChange);
        setValueForm(newElementToChange)
    }
    return { handleChangeForm, valueForm, setValueForm }
}