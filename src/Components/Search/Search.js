import React, { useEffect, useState } from 'react'
import './Search.css'
import InputSearch from './../UI/InputSearch';
import UseInputSearch from '../../Hooks/UseInputSearch'
import UseFetch from '../../Hooks/UseFetch'
import { StatusAlertService } from 'react-status-alert'

export default function Search() {
    const INITIAL_STATE = {
        town: ''
    }
    const { value, handleChange } = UseInputSearch(INITIAL_STATE);
    const { status, data, fetchData } = UseFetch();
    const [url, setUrl] = useState("searchby/town/")
    const [townList, setTownList] = useState([])
    console.log('INITIAL_STATE', value);
    console.log('townList', townList);
    useEffect(() => {
        const timer = setTimeout(() => {
            if (value.town.length !== 0) {
                fetchData(url + value.town)
            } else {
                setTownList([])
            }
        }, 800)
        return () => {
            clearTimeout(timer);
        }
    },
        [value])
    useEffect(() => {
        if (data) {
            setTownList(data)
        }
    }, [data])
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
                    <div className="container_list_of_town">
                        <ul>

                            {townList && townList.map((town, i) =>
                                <li key={i}> {town.name} - {town.zipcode} </li>
                            )

                            }
                        </ul>
                    </div>
                </section>
            </div>
            <div>
                klmkmlklmk
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, fuga inventore eos ipsum facilis accusamus repudiandae aspernatur ut aliquid, molestias culpa laudantium eius illum dolor, animi sit reiciendis facere ratione.
            </div>
        </div>
    )
}
