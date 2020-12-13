import React, { useState, useEffect, useContext } from "react";
import FavCardContainer from '../UI/FavCardContainer';
import UseFetch from '../../Hooks/UseFetch'
import { Context } from '../../Context/Context'
import { StatusAlertService } from 'react-status-alert'
import axios from 'axios';

export default function EventsFav() {
    const {
        user,
    } = useContext(Context)
    const [reload, setReload] = useState(false)
    const { data, fetchData } = UseFetch();
    const removeEstablishment = (e) => {
        axios.delete(`fav/event/${e}`)
            .then(res => {
                StatusAlertService.showSuccess("Etablissement supprimé des favoris avec succès")
                setReload(true)
            })
            .catch(error => {
                StatusAlertService.showError('une erreur est survenue')
            })
    }
    useEffect(() => {
        fetchData(`fav/event/${user.id_user}`)
        setReload(false)
    }, [user, reload])
    console.log("data", data);
    return (
        <div className="establishment_list">
            {data && data.map((x, i) =>
                <FavCardContainer
                    key={x.id_establishment}
                    data={x}
                    naturOfSearch="establishment"
                    favEstablishments={data}
                    removeEstablishmentToFav={(e) => removeEstablishment(e)}
                />)
            }
        </div>
    )
}
