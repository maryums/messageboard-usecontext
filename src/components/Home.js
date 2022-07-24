import React from 'react'
import FilterFeedback from './FilterFeedback'
import FeedbackBoard from './FeedbackBoard'

const Home = (
    // { setSaveNewData, saveCommentReplies, 
    // setFilterTerm, data, setData, categories, 
    // saveFormData, setUpvotesFilter, filteredData, }
) => {
    return (
        <div className="app-container">

            <FilterFeedback
            />

            <FeedbackBoard
            />

        </div>
    )
}

export default Home