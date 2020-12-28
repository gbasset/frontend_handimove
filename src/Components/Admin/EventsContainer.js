import React, { useState, useEffect, useContext } from "react";
import SwitchAdmin from '../UI/SwitchAdmin'
import SearchBar from '../UI/SearchBar'
import Loader from 'react-loader-spinner'
import { Context } from '../../Context/Context'
import UseFetch from '../../Hooks/UseFetch'
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';
import EventCreateContainer from './EventCreateContainer'
import './admin.css'
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import options from './optionsTable'
import UploadContainer from '../Upload/UploadContainer'
import moment from 'moment'
import Modal from '../UI/Modal'

require('react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css');
export default function EventsContainer() {
    const [modalIsOppen, setModalIsOppen] = useState(false)
    const [mode, setMode] = useState("Edit")
    const { data, setData, fetchData } = UseFetch();
    const [value, setValue] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [idOfEvent, setIdOfEvent] = useState()

    const changeValue = (e) => {
        setValue(e.target.value)
    }
    useEffect(() => {
        if (!idOfEvent) {
            const timer = setTimeout(() => {
                if (value && value.length !== 0) {
                    setIsLoading(true)
                    fetchData(`/admin/event/${value}`)
                } else {
                    setData([])
                }
            }, 500)
            return () => {
                clearTimeout(timer);
            }
        }
    }, [value])

    useEffect(() => {
        setIsLoading(false)
    }, [data])
    function urlFormatter(cell, row) {
        return (
            <div className="container-link">
                <span className="link-to-element" onClick={(e) => { setIdOfEvent(cell); setValue(); setData() }}>{cell}
                </span>
                <span className="link-to-element" onClick={(e) => { setIdOfEvent(cell); setValue(); setData() }}>
                    <i className="fas fa-pen"></i>
                </span>
            </div >
        );
    }
    function dateFormatter(cell, row) {
        return (
            <> {moment(cell).format('DD-MM-YYYY')}</>
        );
    }
    const columns = [{
        dataField: 'id',
        text: 'ID',
        formatter: urlFormatter
    },
    {
        dataField: 'name',
        text: 'Nom',
    },
    {
        dataField: 'title',
        text: 'Titre',
    },
    {
        dataField: 'description',
        text: 'Description',
    },
    {
        dataField: 'date_begin',
        text: 'Date Début',
        formatter: dateFormatter
    },
    {
        dataField: 'date_end',
        text: 'Date fin',
        formatter: dateFormatter
    },
    {
        dataField: 'address',
        text: 'Adresse',
    },
    ]

    return (
        <div className="establishment_container">
            { !idOfEvent &&
                <SwitchAdmin
                    mode={mode}
                    setMode={(e) => setMode(e)}
                />}
            {mode === "Edit" && !idOfEvent &&
                <>
                    <SearchBar
                        onChangeValue={(e) => changeValue(e)}
                        value={value}
                        placeholder="Rechercher un événement"
                    />
                    <div className="col-lg-12 mb-4 mt-4 scrollTable">
                        {data && data.length !== 0 &&
                            <BootstrapTable minHeight="600px" keyField='id' data={data} columns={columns} pagination={paginationFactory(options)} />
                        }
                        {data && data.length === 0 &&
                            <div className="center-div"> Il n'y a pas de résultats avec cette recherche </div>
                        }
                    </div>
                </>
            }
            {mode !== "Edit" && !idOfEvent &&
                <EventCreateContainer
                />
            }
            {idOfEvent &&
                <EventCreateContainer
                    idOfEvent={idOfEvent}
                    setIdOfEvent={(e) => setIdOfEvent(e)}
                    setModalIsOppen={(e) => setModalIsOppen(e)}
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
                        idOfEstablishment={idOfEvent}
                        setModalIsOppen={(e) => setModalIsOppen(e)}
                        url="event"
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
