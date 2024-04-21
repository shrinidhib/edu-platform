import { useState } from 'react';
import './Question.css'
import { MdModeEditOutline } from "react-icons/md";
import { useAuthContext } from '../../hooks/useAuthContext';
import './Question.css'




const Question = ({q, index,testId}) => {
    const [question,setQuestion]=useState(q.question)
    const [options, setOptions]=useState(q.options)
    const [answer, setAnswer]=useState(q.answer)
    const [showEdit, setShowEdit]=useState(false)
    const {user}=useAuthContext()

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
        const response=await fetch(`http://localhost:4005/test/${testId}`,{
            method: 'PATCH',
            body: JSON.stringify(body),
            headers: {
                'content-type': 'application/json',
                "Authorization":`Bearer ${user.token}`
                
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
                <label className='preview-label'>{index+1}. {question}</label>
                <MdModeEditOutline onClick={()=>setShowEdit(true)} className='edit-icon' size={25} />
                </div>
            
            <div className='options-section'>
                <div className={options[0]==q.answer?'option preview-option correct-ans':'option preview-option'}>
                    <div>A. {options[0]}</div>
                </div>
                <div className={options[1]==q.answer?'option preview-option correct-ans':'option preview-option'}>
                    <div>B. {options[1]}</div>
                </div>
                <div className={options[2]==q.answer?'option preview-option correct-ans':'option preview-option'}>
                    <div>C. {options[2]}</div>
                </div>
                <div className={options[3]==q.answer?'option preview-option correct-ans':'option preview-option'}>
                    <div>D. {options[3]}</div>
                </div>
            </div>
            </div>
        
        }
        {showEdit && 
            <div>
                 <form onSubmit={editHandler} className="question-form">
                    <div className="question-section">
                        <div className="question-label">Question : </div>
                        <textarea required value={newquestion} onChange={(e)=>setNewQuestion(e.target.value)}className='question' placeholder="Enter question..."></textarea>
                    </div>

                    <div className="options-section">
                        <div className="option">
                        <div style={{color:"black"}}>A. </div>
                        <input required value={option1} onChange={(e)=>setOption1(e.target.value)} className='preview-option-input' placeholder="Option 1..."></input>
                        </div>
                        <div className="option">
                        <div style={{color:"black"}}>B. </div>
                        <input required value={option2} onChange={(e)=>setOption2(e.target.value)} className='preview-option-input' placeholder="Option 2..."></input>
                        </div>
                        <div className="option">
                        <div style={{color:"black"}}>C. </div>
                        <input required value={option3} onChange={(e)=>setOption3(e.target.value)} className='preview-option-input' placeholder="Option 3..."></input>
                        </div>
                        <div className="option">
                        <div style={{color:"black"}}>D. </div>
                        <input required value={option4} onChange={(e)=>setOption4(e.target.value)} className='preview-option-input' placeholder="Option 4..."></input>
                        </div>
                    </div>
                    <div className="edit-answer-section">
                        <div style={{color: "black"}}>Select Correct answer: </div>
                        <select required className='edit-answer-selector' value={newanswer} onChange={(e)=>setNewAnswer(e.target.value)}>
                        <option value="" disabled hidden>Select an option</option>
                        <option value={option1}>{option1}</option>
                        <option value={option2}>{option2}</option>
                        <option value={option3}>{option3}</option>
                        <option value={option4}>{option4}</option>

                        </select>
                    </div>
                    <div className="button-section">
                        {/* <button className='reset-button' onClick={reset}>Reset</button> */}
                        
                        <button className="edit-btn" type="submit">Save</button>

                    </div>
                </form>
            </div>
        }
        
    </div>
  )
}

export default Question
