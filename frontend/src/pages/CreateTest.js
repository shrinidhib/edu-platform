import React, { useState , useEffect} from "react";
import { PreviewTest } from "./PreviewTest";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import './css/CreateTest.css'

const CreateTest = () => {
  const [questions, setQuestions] = useState([]);
  const [title,setTitle]=useState('')
  const [number, setNumber] = useState(1);
  const [showPreview, setShowPreview]=useState(false)
  const {user}=useAuthContext()

  //State for each question
  const navigator=useNavigate()

  const [question,setQuestion]=useState('')
  const [option1,setOption1]=useState('')
  const [option2,setOption2]=useState('')
  const [option3,setOption3]=useState('')
  const [option4,setOption4]=useState('')
  const [answer,setAnswer]=useState('')

  //test state
  const [test, setTest]=useState(null)

  const reset=()=>{
    setQuestion('')
    setOption1('')
    setOption2('')
    setOption3('')
    setOption4('')
    setAnswer('')
  }

  const questionSubmitHandler=async(e)=>{
      e.preventDefault()
      const q={question:question, options: [option1,option2,option3,option4], answer: answer}
      setQuestions((prev)=>[...prev,q])
      reset()
      setNumber((prev)=>prev+1)

  }
  useEffect(() => {
    if (number >= 11) {
      testSubmitHandler();
    }
  }, [number]);

  const testSubmitHandler=async()=>{
      const t={
        questions: questions,
        title: title,
        teacherId:user.user._id
      }
      const response=await fetch("http://localhost:4005/test/",{
        method: 'POST',
        body: JSON.stringify(t),
        headers:{
          'content-type': 'application/json',
          "Authorization":`Bearer ${user.token}`
        }
      })
      const json=await response.json()
      if (response.ok){
        setTest(json)
        setShowPreview(true)
      }
      else{
        console.log(json)
      }


  }

  return (
    <div>
      {!showPreview && (
      <form onSubmit={questionSubmitHandler} className="create-question-form">
        <div className="create-title-container">
          <label >Title of test : </label>
          <input value={title} required onChange={(e)=>setTitle(e.target.value)} className="create-title-input" placeholder="Enter Title of Test"></input>
        </div>
          <h2 className="create-question-header">Question {number}</h2>

          <div className="create-question-section">
              <label className="create-question-label">Question : </label>
              <textarea required value={question} onChange={(e)=>setQuestion(e.target.value)}className='create-question' placeholder="Enter question..."></textarea>
          </div>

          <div className="create-options-section">
            <div className="create-option">
              <div className="create-option-label">A. </div>
              <input required value={option1} onChange={(e)=>setOption1(e.target.value)} className='create-option-input' placeholder="Option 1..."></input>
            </div>
            <div className="create-option">
              <div >B. </div>
              <input required value={option2} onChange={(e)=>setOption2(e.target.value)} className='create-option-input' placeholder="Option 2..."></input>
            </div>
            <div className="create-option">
              <div >C. </div>
              <input required value={option3} onChange={(e)=>setOption3(e.target.value)} className='create-option-input' placeholder="Option 3..."></input>
            </div>
            <div className="create-option">
              <div >D. </div>
              <input required value={option4} onChange={(e)=>setOption4(e.target.value)} className='create-option-input' placeholder="Option 4..."></input>
            </div>
          </div>
          <div className="create-answer-section">
            <label>Select Correct answer: </label>
            <select required className='create-answer-selector' value={answer} onChange={(e)=>setAnswer(e.target.value)}>
              <option value="" disabled hidden>Select an option</option>
              <option value={option1}>{option1}</option>
              <option value={option2}>{option2}</option>
              <option value={option3}>{option3}</option>
              <option value={option4}>{option4}</option>

            </select>
          </div>
          <div className="create-button-section">
            <button className='reset-button' onClick={reset}>Reset</button>
            
            {number===10?<button className="create-button" type="submit">Set Question and Create Test</button>: <button className="create-button" type="submit">Set Question</button>}

          </div>

      </form>
      )}
      {showPreview && <PreviewTest t={test} closeHandler={()=>navigator('/mytests')}/>}
    </div>
  )
};

export default CreateTest