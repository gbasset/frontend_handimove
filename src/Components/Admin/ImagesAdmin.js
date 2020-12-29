import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import Btn from '../UI/Btn'
import Loader from 'react-loader-spinner'
import Modal from '../UI/Modal'
import UseFetch from '../../Hooks/UseFetch'
import UploadContainer from '../Upload/UploadContainer'
import { StatusAlertService } from 'react-status-alert'
export default function ImagesAdmin() {
    const [isLoading, setIsLoading] = useState(false)
    const { data, setData, fetchData } = UseFetch();
    const [modalIsOppen, setModalIsOppen] = useState(false)
    useEffect(() => {
        if (!modalIsOppen) {
            fetchData('/images/avatars')
        }
    }, [modalIsOppen])
    const deteteAvatar = (id) => {
        setIsLoading(true)
        axios.delete(`/images/avatar/${id}`)
            .then(res => {
                StatusAlertService.showSuccess("Avatar supprimé avec succès")
                setIsLoading(false)
                fetchData('/images/avatars')
            })
            .catch(error => {
                StatusAlertService.showError('une erreur est survenue pendant la suppression')
                setIsLoading(false)
            })
    }
    return (
        <div className="container-avatars">
            <div>
                <Btn
                    onClickFunction={() => setModalIsOppen(true)}
                    color="success"
                    message="Uploader"
                    icon="fas fa-cloud-upload-alt"
                />
            </div>
            {data && data.map(elem =>
                <div key={elem.id} className="picture-avatar-container">
                    <img src={elem.url} alt={elem.name} />
                    <p>{elem.name}</p>
                    <p onClick={(e) => deteteAvatar(elem.id)}>Supprimer</p>
                </div>
            )}
            <Modal
                isOpen={modalIsOppen}
                width="1200"
                height="650"
                onClose={() => setModalIsOppen(false)}
            >
                <div className="modal_body">
                    <UploadContainer
                        setModalIsOppen={(e) => setModalIsOppen(e)}
                        url="avatar"
                    />
                    <div className="modal_footer_center ">

                    </div>
                </div>
            </Modal>
            {
                isLoading &&
                <div className="center-div">
                    <Loader
                        type="TailSpin"
                        color="#ffd0ad"
                        height={100}
                        width={100}
                        timeout={3000}
                    />
                </div>
            }

        </div>
    )
}
