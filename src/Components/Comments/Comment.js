import React from 'react'

export default function Comment({ comment }) {
    return (
        <div>
            <div>
                {comment.comment_name}
            </div>
            <div>  {comment.comment}</div>

            {comment.username}
        </div>
    )
}
