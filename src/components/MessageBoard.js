import React, { useContext } from 'react'
import MessagePost from './MessagePost'
import DataContext from "../DataContext";

const MessageBoard = () => {

    const { filteredData } = useContext(DataContext)

    return (
        <div>

            {filteredData && filteredData.map(item => (
                < MessagePost
                    key={item.id}
                    post={item}
                />
            ))}


        </div>


    )
}

export default MessageBoard