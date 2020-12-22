import React from 'react'
import './SearchBar.css'
export default function SearchBar({ onChangeValue, valueInSearchBar, placeholder }) {
    return (
        <div className="search_bar_bar">
            <i className="fa fa-search"></i>
            <input className="searchBar" type="text"
                onChange={onChangeValue}
                value={valueInSearchBar}
                placeholder={placeholder}
            />
        </div>

    )
}
