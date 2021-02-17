import React, { useState, useEffect, useContext } from "react";
import Handicaps from './Handicaps';
import CommentContainer from '../Comments/CommentContainer'
import FormComment from '../Comments/FormComment'
import axios from 'axios';
import Loader from 'react-loader-spinner'
import Btn from '../UI/Btn'
import Modal from '../UI/Modal'
import ImagesContainer from './ImagesContainer'
import { Redirect } from 'react-router-dom';
import { Context } from '../../Context/Context'
import moment from 'moment'
import { StatusAlertService } from 'react-status-alert'
import Map from '../Map/Map'
export default function EstablishmentCardContainer({ data, mode, naturOfSearch, favEstablishments, favEvents, addEventToFav, removeEventsToFav, addEstablishToFavorites, removeEstablishmentToFav, setEstablishmentSelected }) {

    const [arrayOfIds, setArrayOfIds] = useState()
    const [comments, setComments] = useState()
    const [commentIsOppen, setCommentIsOppen] = useState(true)
    const [newCommentIsOppen, setNewCommentIsOppen] = useState(false)
    const [isRealoading, setIsRealoading] = useState(true)
    const [modalIsOppen, setModalIsOppen] = useState(false)
    const [modal2IsOppen, setModal2IsOppen] = useState(false)
    const [redirectTo, setredirectTo] = useState()
    const [images, setImages] = useState([])
    const {
        user,
        setUser
    } = useContext(Context)

    useEffect(() => {
        if (naturOfSearch === "establishment") {
            setArrayOfIds(favEstablishments.map(el => el.id_establishment))
        } else {
            setArrayOfIds(favEvents.map(el => el.id_event))
        }
    }, [favEstablishments, favEvents, naturOfSearch])
    useEffect(() => {
        if (modalIsOppen && commentIsOppen) {
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
    }, [modalIsOppen, commentIsOppen])
    useEffect(() => {
        if (modalIsOppen)
            axios.get(`/images/establishment/${data.id_etablishment}`)
                .then(res => {
                    setImages(res.data)
                })
                .catch(error => {
                    StatusAlertService.showError(error.response.data)
                })
    }, [modalIsOppen])
    const [smallScreen, setSmallScreen] = useState(false);
    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 900px)");
        // addlistener c'est comme addeventlisterner pour les medias queries en JS
        mediaQuery.addListener(handleMediaQueryChange);
        handleMediaQueryChange(mediaQuery);

        return () => {
            mediaQuery.removeListener(handleMediaQueryChange);
        }

    })

    const handleMediaQueryChange = mediaQuery => {
        if (mediaQuery.matches) {
            setSmallScreen(true);
        } else {
            setSmallScreen(false);
        }
    }
    if (redirectTo) {
        return <Redirect to={`${redirectTo}`} />
    }
    if (naturOfSearch === "establishment")
        return (
            <div className={mode === "search" ? "establishment_container_card_overlay" : "establishment_container_card"}>
                <Modal
                    isOpen={modalIsOppen}
                    width="1000"
                    height="600"
                    onClose={() => setModalIsOppen(false)}
                >
                    <Modal
                        isOpen={modal2IsOppen}
                        zindexMax={true}
                        width="900"
                        height="150"
                        onClose={() => setModal2IsOppen(false)}
                    >
                        <div className="modal_body">
                            <h3>Vous devez être connecté pour ajouter un commentaire</h3>
                            <div className="modal_footer_center ">
                                <Btn
                                    onClickFunction={() => setredirectTo("/authentication")}
                                    message="Me connecter"
                                    color="success"
                                />
                                <Btn
                                    onClickFunction={() => setredirectTo("/register")}
                                    message="Créer un compte"
                                />
                            </div>
                        </div>
                    </Modal>
                    <div className="modal_body">
                        {
                            arrayOfIds && arrayOfIds.includes(data.id_etablishment) ?
                                <div className="header-card-modal">
                                    <p> {data.name}   <i className="fas fa-heart heart full-heart"
                                        onClick={mode === "search" ?
                                            (e) => removeEstablishmentToFav(favEstablishments.find(el => el.id_establishment === data.id_etablishment).ID_fav) :
                                            (e) => removeEstablishmentToFav(data.ID_fav)
                                        }></i></p>
                                </div> :
                                <div className="header-card-modal">
                                    <p>{data.name} <i className="far fa-heart heart"
                                        onClick={(e) => addEstablishToFavorites(data.id_etablishment)}
                                    ></i></p>
                                </div>
                        }
                        <div className="container-informations-establishment">
                            <div className="header-adress">
                                <i className="fas fa-home"></i>
                                <p>{data.town}  {data.zip_code}</p>
                                <div> {data.address} </div>
                                <div>{data.region}</div>
                                <div>{data.category}</div>
                                {data.phone && <div> <i className="fas fa-phone"></i> {data.phone}</div>}
                                {
                                    data.url_website && <div >
                                        <a href={data.url_website} target="_blank" rel="noopener noreferrer"> {data.url_website}</a>
                                    </div>
                                }
                            </div>
                            <div className="leaflet-container-card">
                                <Map
                                    isCard={true}
                                    array={[{ longitude: data.longitude, latitude: data.latitude }]}
                                />
                            </div>
                            <div style={{ textAlign: "center", fontWeight: "bold" }}>
                                Handicaps
                                <Handicaps
                                    handiList={data.handicaps}
                                />
                            </div>
                            {images && images.length !== 0 &&
                                < ImagesContainer
                                    images={images}
                                />}

                            <div className="container-comments" >
                                <Btn
                                    onClickFunction={user ? () => { setCommentIsOppen(false); setNewCommentIsOppen(true) } : () => setModal2IsOppen(true)}
                                    message="Ajouter un commentaire"
                                    color="success"
                                    icon="fas fa-comment-medical"
                                />
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
                                    setNewCommentIsOppen={() => { setCommentIsOppen(true); setNewCommentIsOppen(false) }}
                                />
                            }
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
                    !smallScreen ?
                        <div className="body-card-container">
                            <div id="more">
                                <div>
                                    <Btn
                                        onClickFunction={() => setModalIsOppen(true)}
                                        message="Voir plus"
                                        icon="fas fa-plus"
                                        color="success"
                                    />
                                </div>
                            </div>
                            <div className="adress-element">
                                <div className="header-adress">
                                    <i className="fas fa-home"></i>
                                    <p>{data.town}  {data.zip_code}</p>
                                </div>
                            </div>
                            <div> {data.address} </div>
                            <div>{data.region}</div>
                            {data.phone && <div> <i className="fas fa-phone"></i> {data.phone}</div>}
                            <div>{data.category}</div>
                            <Handicaps
                                handiList={data.handicaps}
                            />
                        </div>
                        :
                        <>
                            <div className="adress-element">
                                <div className="header-adress">
                                    <i className="fas fa-home"></i>
                                    <p>{data.town}  {data.zip_code} </p>
                                </div>

                            </div>
                            <div> {data.address} </div>
                            <div>{data.region}</div>
                            {data.phone && <div> <i className="fas fa-phone"></i> {data.phone}</div>}
                            <div>{data.category}</div>
                            <Handicaps
                                handiList={data.handicaps}
                            />
                            <Btn
                                onClickFunction={() => setModalIsOppen(true)}
                                message="Plus d'infos"
                                icon="fas fa-plus"
                                color="success"
                            />

                        </>
                    :
                    <>
                        <div className="adress-element">
                            <div className="header-adress">
                                <i className="fas fa-home"></i>
                                <p>{data.town}  {data.zip_code}</p>
                            </div>
                        </div>
                        {
                            data.url_website && <div className="url_esta">
                                <a href={data.url_website} target="_blank" rel="noopener noreferrer"> {data.url_website}</a>
                            </div>
                        }
                        <div> {data.address} </div>
                        <div>{data.region}</div>
                        {data.phone && <div> <i className="fas fa-phone"></i> {data.phone}</div>}
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
                <div className="adress-element">
                    <div className="header-adress">
                        <i className="fas fa-home"></i>
                        <p>{data.town} </p>
                    </div>
                </div>
                <div> {data.address} </div>
                <div>{data.region_name}</div>
                {data.phone && <div> <i className="fas fa-phone"></i> {data.phone}</div>}
                <div> Description : {data.description}</div>
                {data.event_url && <div className="url">
                    <a href={data.event_url} target="_blank" rel="noopener noreferrer"> {data.event_url}</a>
                </div>}
                <Handicaps
                    handiList={data.handicaps}
                />
            </div>
        )
    }

}
