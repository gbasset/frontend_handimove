import React, { useMemo, useEffect, useState } from "react";
import axios from 'axios';
import { StatusAlertService } from 'react-status-alert'
import Btn from '../UI/Btn'
import { useDropzone } from "react-dropzone";
import Progress from './Progress'
const baseStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out"
};

const activeStyle = {
    borderColor: "#2196f3"
};

const acceptStyle = {
    borderColor: "#00e676"
};

const rejectStyle = {
    borderColor: "#ff1744"
};

const thumbsContainer = {
    display: "flex",
    flexDirection: "column",
    marginTop: 16,
    height: 360,
    overflow: "auto",
};

const thumb = {
    display: "flex",
    borderRadius: 2,
    border: "1px solid #eaeaea",
    marginBottom: 8,
    marginRight: 8,
    width: "300",
    height: 200,
    padding: 4,
    boxSizing: "border-box"
};

const thumbInner = {
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
    overflow: "hidden",
    margin: "auto",
};

const img = {
    display: "block",
    width: "auto",
    maxHeight: 165,
};

function StyledDropzone({ idOfEstablishment, setModalIsOppen, url }) {

    const [uploadPercentage, setUploadPercentage] = useState(0)
    const [files, setFiles] = useState([]);
    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
        acceptedFiles,
        open
    } = useDropzone({
        accept: "image/*",
        noClick: true,
        noKeyboard: true,
        onDrop: acceptedFiles => {
            setFiles(
                acceptedFiles.map(file =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file)
                    })
                )
            );
        }
    });
    const uploadImages = () => {
        const formFiles = new FormData();
        for (const key of Object.keys(files)) {
            formFiles.append("file", files[key]);
        }
        const finalUrl = idOfEstablishment ? `/images/upload/${url}/${idOfEstablishment}` : `/images/upload/${url}`
        axios.post(finalUrl, formFiles, {
            onUploadProgress: progressEvent => {
                setUploadPercentage(Math.round(progressEvent.loaded / progressEvent.total) * 100)
            }
        }, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then(res => {
                StatusAlertService.showSuccess("Images uploadées avec succès")
                setTimeout(() => {
                    setModalIsOppen(false)
                }, 1500)
            })
            .catch(error => {
                StatusAlertService.showError('une erreur est survenue pendant le transfert')
            })
    }
    const style = useMemo(
        () => ({
            ...baseStyle,
            ...(isDragActive ? activeStyle : {}),
            ...(isDragAccept ? acceptStyle : {}),
            ...(isDragReject ? rejectStyle : {})
        }),
        [isDragActive, isDragReject]
    );

    const thumbs = files.map(file => (
        <div style={thumb} key={file.name}>
            <div style={thumbInner}>
                <img src={file.preview} style={img} />
                <div>
                    {file.path} - {file.size} bytes
                </div>
            </div>
        </div>
    ));

    useEffect(
        () => () => {
            // Make sure to revoke the data uris to avoid memory leaks
            files.forEach(file => URL.revokeObjectURL(file.preview));
        },
        [files]
    );

    const filepath = acceptedFiles.map(file => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

    return (
        <div className="container">
            <div {...getRootProps({ style })}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop un fichier</p>
                <button type="button" onClick={open}>
                    Ouvrir un fichier
        </button>
            </div>
            <aside style={thumbsContainer}>
                {thumbs}</aside>
            <Progress percentage={uploadPercentage} />
            <div className="container-btn-upload">
                <Btn
                    onClickFunction={() => setModalIsOppen(false)}
                    message="Annuler"
                    color="warning"
                />
                {files.length === 0 &&
                    <Btn
                        onClickFunction={() => { }}
                        message="Uploader mes images"
                        color="desabled"
                    />
                }
                {files.length !== 0 &&
                    <Btn
                        onClickFunction={() => uploadImages()}
                        message="Uploader mes images"
                        color="success"
                    />
                }
            </div>
        </div>
    )
}

export default StyledDropzone;
