import React, { useEffect, useState } from 'react'
import './css/PreviewTest.css'
import Question from '../components/Question/Question'
export const PreviewTest =({t, closeHandler}) => {
    const [test,setTest]=useState(t)
    console.log(test)
    console.log(test.questions)
  return (
    <div>
    {test && 
        <div className='preview-container'>
          <div className='heading-container'>
            <h2 className='title'>{test.title}</h2>
            <button onClick={()=>closeHandler()} className='close-btn'>Save and Close</button>
          </div>
            {test.questions.map((q,i)=>(
              <div>
              <Question key={i} index={i} q={q} testId={test._id}/>
              </div>)
            )}
        </div>}
    </div>
  )
}

