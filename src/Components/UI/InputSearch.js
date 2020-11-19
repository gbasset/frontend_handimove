import React from 'react'

export default function InputSearch({ onChangeValue, valueInSearchBar, placeholder, name, label }) {
    return (
        <div className="search_bar_container">
            <i className="fa fa-search"></i>
            <input className="searchbar" type="text"
                name={name}
                onChange={onChangeValue}
                value={valueInSearchBar}
                placeholder={placeholder}
            />
        </div>
    )
}
