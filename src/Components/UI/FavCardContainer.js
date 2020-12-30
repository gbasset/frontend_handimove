import React, { useState, useEffect, useContext } from "react";
import Handicaps from './Handicaps';
import CommentContainer from '../Comments/CommentContainer'
import FormComment from '../Comments/FormComment'
import axios from 'axios';
import Loader from 'react-loader-spinner'
import Btn from '../UI/Btn'
import Modal from '../UI/Modal'

import moment from 'moment'
import { StatusAlertService } from 'react-status-alert'
export default function EstablishmentCardContainer({ data, mode, naturOfSearch, favEstablishments, favEvents, addEventToFav, removeEventsToFav, addEstablishToFavorites, removeEstablishmentToFav, setEstablishmentSelected }) {

    const [arrayOfIds, setArrayOfIds] = useState()
    const [comments, setComments] = useState()
    const [commentIsOppen, setCommentIsOppen] = useState(false)
    const [newCommentIsOppen, setNewCommentIsOppen] = useState(false)
    const [isRealoading, setIsRealoading] = useState(true)
    const [modalIsOppen, setModalIsOppen] = useState(false)
    console.log("mode", mode);
    useEffect(() => {
        if (naturOfSearch === "establishment") {
            setArrayOfIds(favEstablishments.map(el => el.id_establishment))
        } else {
            setArrayOfIds(favEvents.map(el => el.id_event))
        }
    }, [favEstablishments, favEvents, naturOfSearch])
    useEffect(() => {
        if (commentIsOppen) {
            setIsRealoading(true)
            axios.get(`/comments/establishment/${data.id_etablishment}`)
                .then(res => {
                    setComments(res.data)
                    setIsRealoading(false)
                })
                .catch(error => {
                    StatusAlertService.showError(error.response.data)
                    setIsRealoading(false)
                })
        }
    }, [commentIsOppen])

    if (naturOfSearch === "establishment")
        return (
            <div className={mode === "search" ? "establishment_container_card_overlay" : "establishment_container_card"}>
                <Modal
                    isOpen={modalIsOppen}
                    width="1200"
                    height="650"
                    onClose={() => setModalIsOppen(false)}
                >
                    <div className="modal_body">
                        {
                            arrayOfIds && arrayOfIds.includes(data.id_etablishment) ?
                                <div className="header-card">
                                    <p> {data.name}   <i className="fas fa-heart heart full-heart"
                                        onClick={mode === "search" ?
                                            (e) => removeEstablishmentToFav(favEstablishments.find(el => el.id_establishment === data.id_etablishment).ID_fav) :
                                            (e) => removeEstablishmentToFav(data.ID_fav)
                                        }></i></p>
                                </div> :
                                <div className="header-card">
                                    <p>{data.name} <i className="far fa-heart heart"
                                        onClick={(e) => addEstablishToFavorites(data.id_etablishment)}
                                    ></i></p>
                                </div>
                        }
                        <div>{data.address}</div>
                        <div> {data.town}  {data.zip_code}</div>
                        <div>{data.region}</div>
                        <div>
                            <div>
                                Commentaires
                              <i className="fas fa-eye"
                                    onClick={() => { setCommentIsOppen(true); setNewCommentIsOppen(false) }}
                                ></i>
                                <i className="fas fa-comment-medical"
                                    onClick={() => { setCommentIsOppen(false); setNewCommentIsOppen(true) }}
                                ></i>
                            </div>
                            {commentIsOppen &&
                                <div>
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
                                    <CommentContainer
                                        commentsList={comments}
                                        setCommentIsOppen={() => setCommentIsOppen(false)}
                                    />
                                </div>
                            }
                            {newCommentIsOppen &&
                                <FormComment
                                    idEstablishment={data.id_etablishment}
                                    setNewCommentIsOppen={() => setNewCommentIsOppen(false)}
                                />
                            }
                            {
                                data.url_website && <div className="url">
                                    <a href={data.url_website} target="_blank" rel="noopener noreferrer"> {data.url_website}</a>
                                </div>
                            }
                            {data.phone && <div>Téléphone : {data.phone}</div>}
                            <div>{data.category}</div>
                            <Handicaps
                                handiList={data.handicaps}
                            />
                        </div>
                        <div className="modal_footer_center ">

                        </div>
                    </div>
                </Modal>
                {mode === "search" ?
                    <>
                        {
                            arrayOfIds && arrayOfIds.includes(data.id_etablishment) ?
                                <div className="header-card">
                                    <p> {data.name}   <i className="fas fa-heart heart full-heart"
                                        onClick={mode === "search" ?
                                            (e) => removeEstablishmentToFav(favEstablishments.find(el => el.id_establishment === data.id_etablishment).ID_fav) :
                                            (e) => removeEstablishmentToFav(data.ID_fav)
                                        }></i></p>
                                </div> :
                                <div className="header-card">
                                    <p>{data.name} <i className="far fa-heart heart"
                                        onClick={(e) => addEstablishToFavorites(data.id_etablishment)}
                                    ></i></p>
                                </div>
                        }
                    </>
                    :
                    <>
                        {
                            arrayOfIds && arrayOfIds.includes(data.id_establishment) ?
                                <div className="header-card">
                                    <p>
                                        {data.establishment_name}
                                        <i className="fas fa-heart heart full-heart"
                                            onClick={mode === "search" ?
                                                (e) => removeEstablishmentToFav(favEstablishments.find(el => el.id_establishment === data.id_establishment).ID_fav) :
                                                (e) => removeEstablishmentToFav(data.ID_fav)
                                            }></i>
                                    </p>
                                </div> :
                                <div className="header-card">
                                    <p>
                                        {data.name} <i className="far fa-heart heart"
                                            onClick={(e) => addEstablishToFavorites(data.id_establishment)}
                                        ></i>
                                    </p>
                                </div>
                        }
                    </>
                }
                {mode === "search" ?
                    <div className="body-card-container">
                        <div id="more">
                            <div>
                                <Btn
                                    onClickFunction={() => setModalIsOppen(true)}
                                    message="Voir plus"
                                    icon="fas fa-plus"
                                />
                            </div>
                        </div>
                        <div>{data.address}</div>
                        <div> {data.town}  {data.zip_code}</div>
                        <div>{data.region}</div>
                        {
                            data.url_website && <div className="url">
                                <a href={data.url_website} target="_blank" rel="noopener noreferrer"> {data.url_website}</a>
                            </div>
                        }
                        {data.phone && <div>Téléphone : {data.phone}</div>}
                        <div>{data.category}</div>
                        <Handicaps
                            handiList={data.handicaps}
                        />
                    </div>
                    :
                    <>
                        <div>{data.address}</div>
                        <div> {data.town}  {data.zip_code}</div>
                        <div>{data.region}</div>
                        {
                            data.url_website && <div className="url">
                                <a href={data.url_website} target="_blank" rel="noopener noreferrer"> {data.url_website}</a>
                            </div>
                        }
                        {data.phone && <div>Téléphone : {data.phone}</div>}
                        <div>{data.category}</div>
                        <Handicaps
                            handiList={data.handicaps}
                        />
                    </>}

            </div>

        )
    else {
        return (
            <div className="establishment_container_card">
                {mode === "search" ?
                    <>
                        {
                            arrayOfIds && arrayOfIds.includes(data.id_event) ?
                                <div className="header-card">
                                    <p>
                                        {data.name}
                                        <i className="fas fa-heart heart full-heart"
                                            onClick={mode === "search" ?
                                                (e) => removeEventsToFav(favEvents.find(el => el.id_event === data.id_event).ID_fav) :
                                                (e) => removeEventsToFav(data.ID_fav)
                                            }></i>
                                    </p>
                                </div> :
                                <div className="header-card">
                                    <p>
                                        {data.name} <i className="far fa-heart heart"
                                            onClick={(e) => addEventToFav(data.id_event)}
                                        ></i>
                                    </p>
                                </div>
                        }
                    </>
                    :
                    <>
                        {
                            arrayOfIds && arrayOfIds.includes(data.id_event) &&
                            <div className="header-card">
                                <p>
                                    {data.name} <i className="fas fa-heart heart full-heart"
                                        onClick={mode === "search" ?
                                            (e) => removeEventsToFav(favEvents.find(el => el.id_event === data.id_event).ID_fav) :
                                            (e) => removeEventsToFav(data.ID_fav)
                                        }></i>
                                </p>
                            </div>
                        }
                    </>
                }
                <div>{moment(data.date_begin).format('DD/MM/YYYY')} - {moment(data.date_end).format('DD/MM/YYYY')} </div>
                <div>{data.address}</div>
                <div> {data.town} </div>
                <div>{data.region_name}</div>
                {data.event_url && <div className="url">
                    <a href={data.event_url} target="_blank" rel="noopener noreferrer"> {data.event_url}</a>
                </div>}
                {data.phone && <div>Téléphone : {data.phone}</div>}
                <div> Description : {data.description}</div>
                <Handicaps
                    handiList={data.handicaps}
                />
            </div>
        )
    }

}
