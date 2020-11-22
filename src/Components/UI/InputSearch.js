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
            <div>
                <input className="searchbar" type="text"
                    name={name}
                    onChange={onChangeValue}
                    value={valueInSearchBar}
                    placeholder={placeholder}
                />
                <span className="search_type_selection">
                    <select
                        name="typeOfSearch"
                        value={searchType}
                        onChange={onChangeFunction}
                    >
                        {searchTypeList.map((elem, i) =>
                            <option key={i} value={elem.value}>{elem.label}</option>
                        )}
                    </select>
                </span>

            </div>
        </div>
    )
}
