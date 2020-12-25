import React from 'react'
import './SelectCustom.css'
export default function SelectCustom({ optionsList, name, label, onChangeFunction, defaultValueDisabled, defaultValue, value }) {
    return (
        <div>
            <div className="input_select_container">
                {label && <label htmlFor={label}>{label}</label>}
                <select
                    className="select-component"
                    name={name}
                    onChange={onChangeFunction}
                    value={value ? value : defaultValueDisabled ? defaultValueDisabled.value : ""}
                >
                    {defaultValueDisabled && <option value={defaultValueDisabled.value} disabled>{defaultValueDisabled.label}</option>}
                    {optionsList && optionsList.map((x, i) => <option key={i} value={x.value} disabled={x.isDisabled ? true : null}> {x.label}</option>)}
                </select>
            </div>
        </div >
    )
}
