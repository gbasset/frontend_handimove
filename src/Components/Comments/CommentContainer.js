import React from 'react'
import Comment from './Comment'
export default function CommentContainer({ commentsList, setCommentIsOppen }) {
    return (
        <div>
            <div onClick={() => setCommentIsOppen()}>close</div>
            <ul>
                {commentsList && commentsList.map((comment, i) =>
                    <li key={i}> <Comment
                        searchMode={true}
                        comment={comment} /></li>
                )}
            </ul>

        </div>
    )
}
