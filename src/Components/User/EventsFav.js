import React, { useState, useEffect, useContext } from "react";
import FavCardContainer from '../UI/FavCardContainer';
import UseFetch from '../../Hooks/UseFetch'
import { Context } from '../../Context/Context'
import { StatusAlertService } from 'react-status-alert'
import axios from 'axios';
import Loader from 'react-loader-spinner'
export default function EventsFav() {
    const {
        user,
    } = useContext(Context)
    const [reload, setReload] = useState(false)
    const { data, fetchData } = UseFetch();
    const [isRealoading, setIsRealoading] = useState(true)
    const removeEstablishment = (e) => {
        axios.delete(`fav/event/${e}`)
            .then(res => {
                StatusAlertService.showSuccess("Etablissement supprimé des favoris avec succès")
                setReload(true)
                setIsRealoading(false)
            })
            .catch(error => {
                StatusAlertService.showError('une erreur est survenue')
                setIsRealoading(false)
            })
    }
    useEffect(() => {
        fetchData(`fav/event/${user.id_user}`)
        setReload(false)
    }, [user, reload])
    useEffect(() => {
        if (data) {
            setIsRealoading(false)
        }
    }, [data])
    console.log("data", data);
    return (
        <div className="establishment_list">
            {
                isRealoading &&
                <Loader
                    type="TailSpin"
                    color="#ffd0ad"
                    height={100}
                    width={100}
                    timeout={3000}
                />
            }

            {!isRealoading && data && data.map((x, i) =>
                <FavCardContainer
                    key={i}
                    data={x}
                    naturOfSearch="establishment"
                    favEstablishments={data}
                    removeEstablishmentToFav={(e) => removeEstablishment(e)}
                />)
            }
        </div>
    )
}
