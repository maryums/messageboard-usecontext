import React, { useState, useContext } from 'react'
import '../styles/feedbackboard.css'
import Form from './Form'
import DataContext from "../DataContext";

import MessageBoard from './MessageBoard'

const FeedbackBoard = () => {

    const { filteredData, setUpvotesFilter } = useContext(DataContext)

    const [showForm, setshowForm] = useState(false)

    const handleSelect = (input) => {
        setUpvotesFilter(input)
    }

    const handleAddFeedback = () => {
        setshowForm(!showForm)

    }


    return (

        <div className="message-board-container">


            <div className="grey-header">

                <div className='suggestions-sortedby'>
                    <h2> {filteredData.length} Suggestions</h2>

                    <label htmlFor='upvotes'></label>
                    <select
                        name="upvotes"
                        id="upvotes"
                        onChange={(e) => handleSelect(e.target.value)}
                    >
                        <option
                        >
                            Sort by...
                        </option>
                        <option
                            value="mostUpvotes">
                            Most Upvotes
                        </option>
                        <option
                            value="leastUpvotes">
                            Least Upvotes
                        </option>
                        <option
                            value="mostComments">
                            Most Comments
                        </option>
                        <option
                            value="leastComments">
                            Least Comments
                        </option>

                    </select>

                </div>


                <div className='button-container'>
                    <button
                        onClick={handleAddFeedback}>+ Add Feedback</button>
                </div>
            </div>

            {showForm &&
                <Form
                />
            }

            <MessageBoard
            />



        </div>
    )
}

export default FeedbackBoard