import React from 'react'
import Comment from './Comment'
export default function CommentContainer({ commentsList, setCommentIsOppen }) {
    return (
        <div className="comment-container">
            <h2>Commentaires</h2>
            <ul>
                {commentsList && commentsList.length === 0 ?
                    <li>
                        Il n'y a pas encore de commentaire pour cet établissement
                    </li>
                    :
                    commentsList && commentsList.map((comment, i) =>
                        <li key={i}> <Comment
                            searchMode={true}
                            comment={comment} /></li>
                    )

                }
            </ul>

        </div>
    )
}
