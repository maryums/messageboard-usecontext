import React, { useContext } from 'react'
import { useParams, useNavigate, Link } from "react-router-dom";
import EachComment from './EachComment'
import DataContext from '../DataContext';

import backlogo from '../assets/shared/icon-arrow-left.svg'
import commentlogo from '../assets/shared/icon-comments.svg'
import upvotesSvg from '../assets/shared/icon-arrow-up.svg'
import userImg from '../assets/user-images/image-anne.jpg'

import '../styles/commentthread.css'
import { nanoid } from 'nanoid';


const CommentThread = () => {

    const { getComments, saveNewCommentFormData, setAddCommentInput, addCommentInput } = useContext(DataContext)

    let navigate = useNavigate();
    let params = useParams();
    let id = params.commentID

    let comment = getComments(id)

    let commentsCount;
    let commentsArr = comment.comments


    if (commentsArr) {
        commentsCount = commentsArr.length
    } else {
        commentsCount = 0
    }


    const handleAddCommentSubmit = (e) => {
        e.preventDefault()

        const newAddComment = {
            id: Math.floor(Math.random() * 100000),
            content: addCommentInput,
            user: {
                image: "./assets/user-images/image-anne.jpg",
                name: "Maryum",
                username: "maryum007"
            }
        }
        saveNewCommentFormData(newAddComment, id)
        setAddCommentInput('')
    }


    return (
        <>

            <div className='comment-thread'>
                <div className='top-goback-edit'>
                    <button onClick={() => navigate(-1)}> <img src={backlogo} /> Go Back </button>

                    <button className='feedback'> Edit Feedback </button>
                </div>

                <div className='main-comment'>

                    <div className='message-post card'>
                        <div className='upvotes-container'>
                            <img src={upvotesSvg} />
                            {comment.upvotes}
                        </div>

                        <div className='post-info-container'>
                            <h3>{comment.title}</h3>

                            <div className='post-description'>
                                <p>{comment.description}</p>
                                <p className='comments-container'>
                                    <img src={commentlogo} />

                                    {commentsCount}  </p>
                            </div>
                            <p className='tag'>{comment.category}</p>
                        </div>
                    </div>
                </div>

                {commentsCount >= 1 &&
                    <div className='comment-count'>
                        {commentsCount} Comments
                    </div>
                }


                {commentsCount >= 1 &&

                    commentsArr.map(item => (
                        <EachComment
                            originalCommentId={id}
                            item={item} />
                    )
                    )}


            </div>

            <div className='add-comment'>
                <h3>Add Comment</h3>

                <form className='comment-form'>
                    <textarea
                        onChange={e => setAddCommentInput(e.target.value)}
                        value={addCommentInput}
                        rows={3}
                    />

                    <div className="button-char-remaining">
                        <span>225 characters remaining</span>
                        <button
                            onClick={handleAddCommentSubmit}

                        >Post Comment</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default CommentThread