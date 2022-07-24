import React, { useState, useContext } from 'react'
import DataContext from '../DataContext'
import { nanoid } from 'nanoid'
import { Link } from 'react-router-dom'
import '../styles/eachcomment.css'
import EachReply from './EachReply'

const EachComment = ({ originalCommentId, item }) => {

    const { saveCommentReplies, seteachCommentInput, eachCommentInput } = useContext(DataContext)


    const [showReply, setShowReply] = useState(false)

    let image = item.user.image

    const handleCommentReply = () => {
        setShowReply(prevState => !prevState)
    }

    const handleCommentReplySubmit = (username) => {

        const newComments = {
            content: eachCommentInput,
            replyingTo: username,
            user: {
                image: "./assets/user-images/image-anne.jpg",
                name: "Maryum",
                username: "maryum007"
            }
        }

        saveCommentReplies(newComments, item.id, originalCommentId)
        seteachCommentInput("")
        setShowReply(prevState => !prevState)
    }


    return (
        <div
            className='comments-reply-thread'
        >

            <div className='reply-author-photo'>

                <img src={image} />
            </div>

            <div className='reply-author-content'>

                <div className="user-link">
                    <p className="reply-user-name">{item.user.name} </p>
                    <span
                        onClick={handleCommentReply}>Reply</span>
                </div>
                <p className='reply-user-handle'>@ {item.user.username} </p>
                <p>{item.content}</p>

                {showReply &&

                    <div className='reply-form'>
                        <textarea
                            value={eachCommentInput}
                            onChange={(e) => seteachCommentInput(e.target.value)}
                            rows={3}
                        />
                        <button
                            onClick={() => handleCommentReplySubmit(item.user.username)}>Post Reply</button>

                    </div>
                }

                <br />

                {item.replies &&

                    item.replies.map(item => (
                        <EachReply
                            key={Math.random() * 100000}
                            item={item}
                        />
                    ))

                }

            </div>
        </div>

    )
}

export default EachComment