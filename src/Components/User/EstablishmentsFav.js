import React, { useState, useEffect, useContext } from "react";
import EstablishmentCardContainer from './../UI/EstablishmentCardContainer';
import UseFetch from '../../Hooks/UseFetch'
import { Context } from '../../Context/Context'
import { StatusAlertService } from 'react-status-alert'
import axios from 'axios';
export default function EstablishmentsFav() {
    const {
        user,
        setUser
    } = useContext(Context)
    const [reload, setReload] = useState(false)
    const { status, data, fetchData } = UseFetch();
    const removeEvent = (e) => {
        axios.delete(`fav/establishments/${e}`)
            .then(res => {
                StatusAlertService.showSuccess("Etablissement supprimé des favoris avec succès")
                setReload(true)
            })
            .catch(error => {
                StatusAlertService.showError('une erreur est survenue')
            })
    }
    useEffect(() => {
        fetchData(`fav/establishments/${user.id_user}`)
        setReload(false)
    }, [user, reload])
    console.log("data", data);
    return (

        <div className="establishment_list">
            {data && data.map((x, i) =>
                <EstablishmentCardContainer
                    key={x.id_establishment}
                    data={x}
                    naturOfSearch="establishment"
                    favEstablishments={data}
                    removeEventToFav={(e) => removeEvent(e)}
                />)
            }
        </div>
    )
}
