import React, { useEffect, useState } from 'react'
import './css/PreviewTest.css'
import Question from '../components/Question/Question'
export const PreviewTest =({t}) => {
    const [test,setTest]=useState(t)
    console.log(test)
    console.log(test.questions)
  return (
    <div>
    {test && 
        <div className='preview-container'>
            <h2 className='title'>{test.title}</h2>
            {test.questions.map((q,i)=>(
              <div>
              <Question key={q._id} index={i} q={q}/>
              </div>)
            )}
        </div>}
    </div>
  )
}

