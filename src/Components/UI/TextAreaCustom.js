import React from 'react'
import './TextAreaCustom.css'
export default function TextAreaCustom({ onChangeFunction, name, value }) {
    return (
        <div>
            <textarea
                className="container-textarea-custom"
                name={name}
                onChange={(e) => onChangeFunction(e)} />
        </div>
    )
}
