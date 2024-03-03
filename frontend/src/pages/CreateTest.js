import React, { useState , useEffect} from "react";
import {useNavigate} from 'react-router-dom'

export const CreateTest = () => {
  const [questions, setQuestions] = useState([]);
  const [title,setTitle]=useState('')
  const [number, setNumber] = useState(1);

  const navigate=useNavigate()
  //State for each question

  const [question,setQuestion]=useState('')
  const [option1,setOption1]=useState('')
  const [option2,setOption2]=useState('')
  const [option3,setOption3]=useState('')
  const [option4,setOption4]=useState('')
  const [answer,setAnswer]=useState('')

  const reset=()=>{
    setQuestion('')
    setOption1('')
    setOption2('')
    setOption3('')
    setOption4('')
    setAnswer('')
  }

  const questionSubmitHandler=async(e)=>{
    console.log(questions)
      e.preventDefault()
      const q={question:question, options: [option1,option2,option3,option4], answer: answer}
      const response=await fetch("http://localhost:4005/questions/",{
        method: 'POST',
        body: JSON.stringify(q),
        headers:{
          'Content-type': 'application/json'
        }
      })
      const json=await response.json()
      if (response.ok){
        console.log(json)
        setQuestions((prev)=>[...prev,json])
        reset()
        setNumber((prev)=>prev+1)
        
      }

  }
  useEffect(() => {
    if (number === 11) {
      testSubmitHandler();
    }
  }, [number]);

  const testSubmitHandler=async()=>{
      console.log(questions)
      const t={
        questions: questions,
        title: title,
        teacherId:3
      }
      const response=await fetch("http://localhost:4005/test/",{
        method: 'POST',
        body: JSON.stringify(t),
        headers:{
          'content-type': 'application/json'
        }
      })
      const json=await response.json()
      if (response.ok){
        console.log(json)
        navigate("/preview",{state:{test: json}})
      }


  }

  return (
    <div className="container">
      <form onSubmit={questionSubmitHandler} className="question-form">
        <div className="title-container">
          <input value={title} required onChange={(e)=>setTitle(e.target.value)} className="title-input" placeholder="Enter Title of Test"></input>
        </div>
          <h2 className="question-header">Question {number}</h2>

          <div className="question-section">
              <label className="question-label">Question: </label>
              <textarea required value={question} onChange={(e)=>setQuestion(e.target.value)}className='question' placeholder="Enter question..."></textarea>
          </div>

          <div className="options-section">
            <div className="option">
              <p style={{color: "white"}}>A. </p>
              <input required value={option1} onChange={(e)=>setOption1(e.target.value)} className='option-input' placeholder="Option 1..."></input>
            </div>
            <div className="option">
              <p style={{color: "white"}}>B. </p>
              <input required value={option2} onChange={(e)=>setOption2(e.target.value)} className='option-input' placeholder="Option 2..."></input>
            </div>
            <div className="option">
              <p style={{color: "white"}}>C. </p>
              <input required value={option3} onChange={(e)=>setOption3(e.target.value)} className='option-input' placeholder="Option 3..."></input>
            </div>
            <div className="option">
              <p style={{color: "white"}}>D. </p>
              <input required value={option4} onChange={(e)=>setOption4(e.target.value)} className='option-input' placeholder="Option 4..."></input>
            </div>
          </div>
          <div className="answer-section">
            <h3 style={{color: "white"}}>Select Correct answer: </h3>
            <select required className='answer-selector' value={answer} onChange={(e)=>setAnswer(e.target.value)}>
              <option value="" disabled hidden>Select an option</option>
              <option value={option1}>{option1}</option>
              <option value={option2}>{option2}</option>
              <option value={option3}>{option3}</option>
              <option value={option4}>{option4}</option>

            </select>
          </div>
          <div className="button-section">
            <button className='reset-button' onClick={reset}>Reset</button>
            
            {number===10?<button type="submit">Set Question and Create Test</button>: <button type="submit">Set Question</button>}

          </div>

      </form>
    </div>
  )
};
