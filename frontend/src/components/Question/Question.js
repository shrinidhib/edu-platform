import { useState } from 'react';
import './Question.css'
import { MdModeEditOutline } from "react-icons/md";




const Question = ({q, index,testId}) => {
    const [question,setQuestion]=useState(q.question)
    const [options, setOptions]=useState(q.options)
    const [answer, setAnswer]=useState(q.answer)
    const [showEdit, setShowEdit]=useState(false)

    //edit state
    const [newquestion,setNewQuestion]=useState(question)
    const [option1,setOption1]=useState(options[0])
    const [option2,setOption2]=useState(options[1])
    const [option3,setOption3]=useState(options[2])
    const [option4,setOption4]=useState(options[3])
    const [newanswer,setNewAnswer]=useState(answer)


    const editHandler=async(e)=>{
        e.preventDefault()
        const body={
            newQuestion:{
                question: newquestion,
                options: [option1, option2, option3, option4],
                answer: newanswer
            },
            index: index
        }
        console.log(body)
        const response=await fetch(`http://localhost:4005/test/${testId}`,{
            method: 'PATCH',
            body: JSON.stringify(body),
            headers: {
                'content-type': 'application/json'
            }
        }
        )
        const json=await response.json()
        if (!response.ok){
            console.log(json.error)
        }
        else{
            setQuestion(newquestion)
            setOptions([option1,option2,option3,option4])
            setAnswer(newanswer)
            setShowEdit(false)
        }
    }
  return (
    <div>
        {!showEdit && 
            <div>
                <div className='preview-title'>
                <h3>{index+1}. {question}</h3>
                <MdModeEditOutline onClick={()=>setShowEdit(true)}className='edit-icon' size={25} />
            </div>
            
            <div className='options-section'>
                <div className='option preview-option'>
                    <p>A. {options[0]}</p>
                </div>
                <div className='option preview-option'>
                    <p>B. {options[1]}</p>
                </div>
                <div className='option preview-option'>
                    <p>C. {options[2]}</p>
                </div>
                <div className='option preview-option'>
                    <p>D. {options[3]}</p>
                </div>
            </div>
            </div>
        
        }
        {showEdit && 
            <div>
                 <form onSubmit={editHandler} className="question-form">
                    <div className="question-section">
                        <label className="question-label">Question: </label>
                        <textarea required value={newquestion} onChange={(e)=>setNewQuestion(e.target.value)}className='question' placeholder="Enter question..."></textarea>
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
                        <select required className='answer-selector' value={newanswer} onChange={(e)=>setNewAnswer(e.target.value)}>
                        <option value="" disabled hidden>Select an option</option>
                        <option value={option1}>{option1}</option>
                        <option value={option2}>{option2}</option>
                        <option value={option3}>{option3}</option>
                        <option value={option4}>{option4}</option>

                        </select>
                    </div>
                    <div className="button-section">
                        {/* <button className='reset-button' onClick={reset}>Reset</button> */}
                        
                        <button type="submit">Save</button>

                    </div>
                </form>
            </div>
        }
        
    </div>
  )
}

export default Question
