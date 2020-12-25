import React, { useState, useEffect, useContext } from "react";
import SwitchAdmin from '../UI/SwitchAdmin'
import SearchBar from '../UI/SearchBar'
import Loader from 'react-loader-spinner'
import { Context } from '../../Context/Context'
import { Link } from 'react-router-dom';
import UseFetch from '../../Hooks/UseFetch'
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';
import EstablishmentCreateCOntainer from './EstablishmentCreateContainer'
import './admin.css'
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import options from './optionsTable'
import UploadContainer from '../Upload/UploadContainer'
import Btn from '../UI/Btn'
import Modal from '../UI/Modal'
require('react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css');
export default function EstablishmentContainer() {
    const [modalIsOppen, setModalIsOppen] = useState(false)
    const [mode, setMode] = useState("Edit")
    const { data, setData, fetchData } = UseFetch();
    const [value, setValue] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [idOfEstablishment, setIdOfEstablishment] = useState()
    const changeValue = (e) => {
        setValue(e.target.value)
    }
    useEffect(() => {
        const timer = setTimeout(() => {
            if (value && value.length !== 0) {
                setIsLoading(true)
                fetchData(`admin/establishments/${value}`)
            } else {
                setData([])
            }
        }, 500)
        return () => {
            clearTimeout(timer);
        }
    }, [value])

    useEffect(() => {
        setIsLoading(false)
    }, [data])
    function urlFormatter(cell, row) {
        return (
            <div className="container-link">
                <span className="link-to-element" onClick={() => { setIdOfEstablishment(cell); setValue(); setData() }}>{cell}
                </span>
                <span className="link-to-element" onClick={() => { setIdOfEstablishment(cell); setValue(); setData() }}>
                    <i className="fas fa-pen"></i>
                </span>
            </div>
        );
    }
    const columns = [{
        dataField: 'id_etablishment',
        text: 'ID Etablissement',
        formatter: urlFormatter
    },
    {
        dataField: 'name',
        text: 'Nom de l\'etablissement',
    },
    {
        dataField: 'category',
        text: 'Categorie',
    },
    {
        dataField: 'department',
        text: 'Département',
    },
    {
        dataField: 'region',
        text: 'Region',
    },
    {
        dataField: 'town',
        text: 'Ville',
    },
    {
        dataField: 'zip_code',
        text: 'Code postal',
    },
    ]

    return (
        <div className="establishment_container">
            { !idOfEstablishment &&
                <SwitchAdmin
                    mode={mode}
                    setMode={(e) => setMode(e)}
                />
            }
            {mode === "Edit" && !idOfEstablishment &&
                <>
                    <SearchBar
                        onChangeValue={(e) => changeValue(e)}
                        value={value}
                        placeholder="Rechercher un etablissement"
                    />
                    <div className="col-lg-12 mb-4 mt-4 scrollTable">
                        {data && data.length !== 0 &&
                            <BootstrapTable minHeight="600px" keyField='id_etablishment' data={data} columns={columns} pagination={paginationFactory(options)} />
                        }

                        {data && data.length === 0 &&
                            <div className="center-div"> Il n'y a pas de résultats avec cette recherche </div>
                        }
                    </div>
                </>
            }
            {
                mode !== "Edit" && !idOfEstablishment &&
                < EstablishmentCreateCOntainer />
            }
            {
                mode === "Edit" && idOfEstablishment &&
                < EstablishmentCreateCOntainer
                    setModalIsOppen={(e) => setModalIsOppen(e)}
                    idOfEstablishment={idOfEstablishment}
                    setIdOfEstablishment={(e) => setIdOfEstablishment(e)}
                />
            }
            <Modal
                isOpen={modalIsOppen}
                width="1200"
                height="650"
                onClose={() => setModalIsOppen(false)}
            >
                <div className="modal_body">
                    <UploadContainer
                        idOfEstablishment={idOfEstablishment}
                        setModalIsOppen={(e) => setModalIsOppen(e)}
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
        </div >
    )
}
