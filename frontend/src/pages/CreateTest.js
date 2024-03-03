import React, { useState } from "react";

export const CreateTest = () => {
  const [questions, setQuestions] = useState([]);
  const [title,setTitle]=useState('')
  const [number, setNumber] = useState(1);

  //State for each question

  const [question,setQuestion]=useState('')
  const [option1,setOption1]=useState('')
  const [option2,setOption2]=useState('')
  const [option3,setOption3]=useState('')
  const [option4,setOption4]=useState('')

  const reset=()=>{
    setQuestion('')
    setOption1('')
    setOption2('')
    setOption3('')
    setOption4('')
  }

  return (
    <div className="container">
    <input onChange={(e)=>setTitle(e.target.value)} className="title-input" placeholder="Enter Title of Test"></input>
    <form className="question-form">
        <h2 className="question-header">Question {number}</h2>

        <div className="question-section">
            <label className="question-label">Question: </label>
            <textarea value={question} onChange={(e)=>setQuestion(e.target.value)}className='question' placeholder="Enter question..."></textarea>
        </div>

        <div className="options-section">
            <input value={option1} onChange={(e)=>setOption1(e.target.value)} className='option' placeholder="Option 1..."></input>
            <input value={option2} onChange={(e)=>setOption2(e.target.value)} className='option' placeholder="Option 2..."></input>
            <input value={option3} onChange={(e)=>setOption3(e.target.value)} className='option' placeholder="Option 3..."></input>
            <input value={option4} onChange={(e)=>setOption4(e.target.value)} className='option' placeholder="Option 4..."></input>
        </div>
        <div className="button-section">
          <button className='reset-button' onClick={reset}>Reset</button>
          <button type="submit">Set Question</button>

        </div>

    </form>
    </div>
  )
};
