import React from 'react'

export default function InputSearch({ onChangeValue, valueInSearchBar, placeholder, name, label, onChangeFunction, searchType }) {

    const searchTypeList = [
        {
            value: 'town',
            label: 'Ville'
        },
        {
            value: 'department',
            label: 'Departement'
        },
        {
            value: 'regions',
            label: 'Region'
        },
    ]
    return (
        <div className="search_bar_container">
            <i className="fa fa-search"></i>
            <input className="searchbar" type="text"
                name={name}
                onChange={onChangeValue}
                value={valueInSearchBar}
                placeholder={placeholder}
            />
            <select
                name="typeOfSearch"
                value={searchType}
                onChange={onChangeFunction}
            >
                {searchTypeList.map((elem, i) =>
                    <option value={elem.value}>{elem.label}</option>
                )}
            </select>
        </div>
    )
}
