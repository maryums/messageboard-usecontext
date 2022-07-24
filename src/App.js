import react, { useState, useContext, useEffect } from 'react'
import Home from './components/Home';
import Form from './components/Form';
import CommentThread from './components/CommentThread'
import { Routes, Route } from "react-router-dom";
import DataContext from './DataContext';


function App() {

  const { data, filterData, upvotesFilter, filterUpvotesData, filterTerm, saveNewData } = useContext(DataContext)

  useEffect(() => {
    console.log(filterTerm)
    console.log(saveNewData)
    console.log(upvotesFilter)

    filterData(filterTerm)
    filterUpvotesData(upvotesFilter)

  }, [filterTerm, upvotesFilter, saveNewData])


  return (
    <div>

      <Routes>
        <Route path="/" element={
          <Home />}
        />
        <Route path="form" element={
          <Form />}
        />
        <Route path=":commentID" element={
          <CommentThread />
        }
        />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>

    </div>
  );
}

export default App;
