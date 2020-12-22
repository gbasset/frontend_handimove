import React, { useState, useEffect, useContext } from "react";
import SwitchAdmin from '../UI/SwitchAdmin'

import Loader from 'react-loader-spinner'
import { Context } from '../../Context/Context'
import UseFetch from '../../Hooks/UseFetch'
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';

import './admin.css'
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import options from './optionsTable'
require('react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css');
export default function AdminComments() {
    const [mode, setMode] = useState("Edit")
    const { data, setData, fetchData } = UseFetch();

    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
        fetchData(`admin/comments/`)

    }, [])
    console.log("mode", mode);
    useEffect(() => {
        setIsLoading(false)
    }, [data])
    const columns = [{
        dataField: 'comment_id',
        text: 'ID commentaire',
    },
    {
        dataField: 'date',
        text: 'Date',
    },
    {
        dataField: 'comment_name',
        text: 'Nom',
    },
    {
        dataField: 'comment',
        text: 'Commentaire',
    },
    {
        dataField: 'establishment_name',
        text: 'Etablissement',
    },
    {
        dataField: 'username',
        text: 'Utilisateur',
    },
    {
        dataField: 'id_user',
        text: 'Id Utilisateur',
    },
    ]

    console.log("data", data);
    return (
        <div className="establishment_container">
            <SwitchAdmin
                mode={mode}
                setMode={(e) => setMode(e)}
            />
            {mode === "Edit" &&
                <>
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
