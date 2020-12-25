import React from 'react'
import './Comment.css'
export default function Comment({ comment, searchMode }) {
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
                </>
            }

        </div>
    )
}
