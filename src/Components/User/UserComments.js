import React, { useState, useEffect, useContext } from "react";
import { Context } from '../../Context/Context'
import { StatusAlertService } from 'react-status-alert'
import axios from 'axios';
import Loader from 'react-loader-spinner'
import Empty from '../UI/Empty'
import Comment from '../Comments/Comment'
export default function UserComments() {
    const {
        user,
    } = useContext(Context)
    const [commentList, setCommentList] = useState()
    const [modifiedComment, setModiFiedComment] = useState(false)
    const [isRealoading, setIsRealoading] = useState(true)
    useEffect(() => {
        setIsRealoading(true)
        axios.get(`/comments/user/${user.id_user}`)
            .then(res => {
                setCommentList(res.data)
                setIsRealoading(false)
            })
            .catch(error => {
                setIsRealoading(false)
                StatusAlertService.showError(error.response.data)
            })
    }, [])

    console.log("commentList", commentList);
    return (
        <div>

            {!isRealoading && commentList && commentList.map(comment =>
                <Comment
                    key={comment.id_comment}
                    comment={comment}
                />
            )}
            {
                !isRealoading && commentList && commentList.length === 0 &&
                <Empty name=" écrit de commentaire, vous pouvez en créer pour les retrouver sur cette page ." />
            }
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
        </div>
    )
}
