import React, { useState, useEffect, useContext } from "react";

import Loader from 'react-loader-spinner'
import { Context } from '../../Context/Context'
import UseFetch from '../../Hooks/UseFetch'
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';
import MessageCreateContainer from './MessageCreateContainer'
import './admin.css'
import SwitchComments from '../UI/SwitchComments'
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import options from './optionsTable'
import moment from 'moment'

require('react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css');
export default function MessagesContainer() {
    const { data, setData, fetchData } = UseFetch();
    const [isLoading, setIsLoading] = useState(false)
    const [idOfMessage, setIdOfMessage] = useState()
    const [mode, setMode] = useState("unRead")
    const [unreadList, setUntreadList] = useState([])

    useEffect(() => {
        if (data) {
            const arrayOfUnread = [];
            for (let i = 0; i < data.length; i++) {
                if (data[i].status === "unread") {
                    arrayOfUnread.push(data[i])
                }
            }
            setUntreadList(arrayOfUnread)
        }
    }, [data])
    useEffect(() => {
        if (!idOfMessage) {
            fetchData(`messages/all/`)
        }
    }, [idOfMessage])

    useEffect(() => {
        setIsLoading(false)
    }, [data])
    function urlFormatter(cell, row) {
        return (
            <div className="container-link">
                <span className="link-to-element" onClick={() => { setIdOfMessage(cell); setData() }}>{cell}
                </span>
                <span className="link-to-element" onClick={() => { setIdOfMessage(cell); setData() }}>
                    <i className="fas fa-pen"></i>
                </span>
            </div>
        );
    }
    function dateFormatter(cell, row) {
        return (
            <> {moment(cell).format('DD-MM-YYYY')}</>
        );
    }
    function messageFormatter(cell, row) {
        return (
            <p className="message-form"> {cell}</p>
        );
    }
    const columns = [{
        dataField: 'id',
        text: 'ID commentaire',
        formatter: urlFormatter
    },
    {
        dataField: 'name',
        text: 'Nom',
    },
    {
        dataField: 'date',
        text: 'Date',
        formatter: dateFormatter
    },
    {
        dataField: 'subject',
        text: 'Sujet',
    },
    {
        dataField: 'message',
        text: 'Message',
        formatter: messageFormatter
    },
    {
        dataField: 'contact',
        text: 'Contact',
    },
    ]

    return (
        <div className="establishment_container">
            <SwitchComments
                mode={mode}
                setMode={(e) => setMode(e)}
            />
            {!idOfMessage &&
                <>
                    <div className="col-lg-12 mb-4 mt-4 scrollTable">
                        {data && data.length !== 0 &&
                            <BootstrapTable minHeight="600px" keyField='id' data={mode === "unRead" ? unreadList : data} columns={columns} pagination={paginationFactory(options)} />
                        }
                    </div>
                </>
            }
            {
                idOfMessage &&
                <MessageCreateContainer
                    idOfMessage={idOfMessage}
                    setIdOfMessage={(e) => setIdOfMessage(e)}
                />
            }
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
