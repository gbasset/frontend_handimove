import React from 'react'
import './Comment.css'
export default function Comment({ comment, searchMode }) {
    return (
        <div className="comment-container">
            {
                searchMode &&
                <>
                    <div>nom
                {comment.comment_name}
                    </div>
                    <div> commentaire {comment.comment}</div>
                    <div>
                        utilisateur
                {comment.username}
                    </div>
                </>
            }
            {
                !searchMode &&
                <>
                    <div>
                        nom
                {comment.comment_name}
                    </div>
                    <div> commentaire {comment.comment}</div>
                    <div>
                        utilisateur
                {comment.username}
                    </div>
                    <div>
                        nom de l'etablissement
                {comment.establish_name}
                    </div>
                </>
            }

        </div>
    )
}
