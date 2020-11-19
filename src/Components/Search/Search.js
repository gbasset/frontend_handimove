import React from 'react'
import './Search.css'
import InputSearch from './../UI/InputSearch';
import UseInputSearch from '../../Hooks/UseInputSearch'

export default function Search() {
    const INITIAL_STATE = {
        town: ''
    }
    const { value, handleChange } = UseInputSearch(INITIAL_STATE);

    console.log('INITIAL_STATE', value);
    return (
        <div className="search_container">
            <div className="search_header">
                <section>
                    <h1>Rechercher</h1>
                    <InputSearch
                        name="town"
                        onChangeValue={handleChange}
                        valueInSearchBar={value.town}
                        placeholder="Chercher une ville"
                    />
                </section>
            </div>
            <div>
                klmkmlklmk
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, fuga inventore eos ipsum facilis accusamus repudiandae aspernatur ut aliquid, molestias culpa laudantium eius illum dolor, animi sit reiciendis facere ratione.
            </div>
        </div>
    )
}
