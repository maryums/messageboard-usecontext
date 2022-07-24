import { createContext, useState } from "react";
import fakeData from './FakeData'
import produce from 'immer'

const DataContext = createContext(null)

export function DataProvider({ children }) {

    const [data, setData] = useState(fakeData[0].productRequests)
    const [filteredData, setFilteredData] = useState(data)

    const [filterTerm, setFilterTerm] = useState('all')

    const [upvotesFilter, setUpvotesFilter] = useState('')
    const [saveNewData, setSaveNewData] = useState(false)
    const [eachCommentInput, seteachCommentInput] = useState("")
    const [addCommentInput, setAddCommentInput] = useState("")

    console.log(upvotesFilter)


    let categories = []
    let searchArr = data

    searchArr.forEach(item => {
        if (!categories.includes(item.category)) {
            categories.push(item.category)
        }
    })


    const getComments = (id) => {
        return data.find(comment => comment.id.toString() === id)
    }

    const saveFormData = (request) => {
        setData([...data, request])
        setSaveNewData(prevState => !prevState)
    }

    const saveNewCommentFormData = (request, id) => {

        let fullComment = (data.find((item) => item.id === parseInt(id)))
        let indexComment = data.indexOf(fullComment)

        const nextState = produce(data, draftState => {

            if (!draftState[indexComment].comments) {
                draftState[indexComment].comments = []
            }

            draftState[indexComment].comments.push(request)
        })

        setData(nextState)
        setSaveNewData(prevState => !prevState)

    }

    const saveCommentReplies = (reply, commentId, itemId) => {

        let fullComment = (data.find((item) => item.id === parseInt(itemId)))
        let indexComment = data.indexOf(fullComment)

        let fullReply = (fullComment.comments).find(comment => comment.id === parseInt(commentId))
        let indexReply = (fullComment.comments).indexOf(fullReply)

        const nextState = produce(data, draftState => {
            if (!draftState[indexComment].comments[indexReply].replies) {
                draftState[indexComment].comments[indexReply].replies = []
            }
            draftState[indexComment].comments[indexReply].replies.push(reply)
        })

        setData(nextState)
        setSaveNewData(prevState => !prevState)
    }

    const filterData = (filterTerm) => {
        if (filterTerm === "all" | '') {
            setFilteredData(searchArr)
        }

        else if (filterTerm !== '') {
            const nextFilteredData = searchArr.filter(item => item.category === filterTerm)
            setFilteredData(nextFilteredData)
        }
    }

    const filterUpvotesData = (upvotesFilter) => {

        if (upvotesFilter === "leastUpvotes") {
            console.log("this works")

            setFilteredData(prevState => [...prevState].sort((a, b) => a.upvotes - b.upvotes))
            console.log(filteredData)
        }

        else if (upvotesFilter === "mostUpvotes") {
            setFilteredData(prevState => [...prevState].sort((a, b) => b.upvotes - a.upvotes))
        }

        else if (upvotesFilter === "mostComments") {
            console.log("most")
            setFilteredData(prevState => [...prevState].sort((a, b) => {

                let commentALen; let commentBLen;

                !a.comments ? commentALen = 0 : commentALen = a.comments.length
                !b.comments ? commentBLen = 0 : commentBLen = b.comments.length

                // if (!b.comments) {
                //   commentBLen = 0
                // }
                // else {
                //   commentBLen = b.comments.length
                // }
                return commentBLen - commentALen
            }))

        }


        else if (upvotesFilter === "leastComments") {
            setFilteredData(prevState => [...prevState].sort((a, b) => {
                let commentALen; let commentBLen;

                !a.comments ? commentALen = 0 : commentALen = a.comments.length
                !b.comments ? commentBLen = 0 : commentBLen = b.comments.length

                // if (!b.comments) {
                //   commentBLen = 0
                // }
                // else {
                //   commentBLen = b.comments.length
                // }
                return commentALen - commentBLen
            }))

        }

        else {
            setFilteredData(prevState => prevState)
        }
    }

    return (
        <DataContext.Provider value={
            {
                filterData, data, setData, filteredData, setFilteredData, setUpvotesFilter, setSaveNewData, eachCommentInput, seteachCommentInput, addCommentInput, setAddCommentInput, filterTerm, getComments, categories, filterUpvotesData, saveCommentReplies, setFilterTerm, saveFormData, saveNewData, upvotesFilter
            }
        }>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext