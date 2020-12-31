import React from 'react'
import './Comment.css'
import moment from 'moment'
export default function Comment({ comment, searchMode }) {
    console.log("comment", comment);
    return (
        <div className="comment-container">
            {
                searchMode &&
                <>
                    <div className="user-name-comment">
                        <i className="fas fa-user"></i>
                    @{comment.username}
                    </div>
                    <div className="comment-name">{comment.comment_name}</div>
                    <div className="comment-container-content"> {comment.comment}</div>
                   Le {moment(comment.date).format('DD/MM/YYYY à HH:MM')}
                </>
            }
            {
                !searchMode &&
                <>
                    <div className="user-name-comment">
                        <i className="fas fa-user"></i>
                        @{comment.username}
                    </div>
                    <div className="comment-name">{comment.comment_name}</div>
                    <div className="comment-container-content"> {comment.comment}</div>
                    <h5>Nom de l'établissement</h5>
                    <div>
                        {comment.establish_name}
                    </div>
                    Le {moment(comment.date).format('DD/MM/YYYY à HH:MM')}
                </>
            }

        </div>
    )
}
