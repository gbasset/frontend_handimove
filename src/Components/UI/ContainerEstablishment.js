import React from 'react'
import Handicaps from './Handicaps';
import CommentContainer from '../Comments/CommentContainer'
import FormComment from '../Comments/FormComment'
import axios from 'axios';
import Loader from 'react-loader-spinner'
import Btn from '../UI/Btn'
import moment from 'moment'
import { StatusAlertService } from 'react-status-alert'
export default function ContainerEstablishment() {
    return (
        <div>
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
    )
}
