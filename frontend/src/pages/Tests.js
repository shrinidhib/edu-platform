import React, { useEffect, useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { PreviewTest } from './PreviewTest'

export const Tests = () => {
    const navigate=useNavigate()
    const [showPreview,setShowPreview]=useState(false)
    const [tests,setTests]=useState([])
    const [currentTest, setCurrentTest]=useState(null)
    const fetchTests=async()=>{
        const response=await fetch('http://localhost:4005/test/')
        const json=await response.json()
        setTests(json)
    }
    useEffect(()=>{
        fetchTests()
        console.log(tests)
    },[])

    const handleClick=(t)=>{
        console.log('here1')
        setCurrentTest(t)
        setShowPreview(true)
        
    }

  return (
    <div>
        {!showPreview && 
            <div>
            {tests.map((t)=>(
                    <p onClick={()=>handleClick(t)}>{t.title}</p>
                ))}
            </div>
        }
        {showPreview && <PreviewTest t={currentTest} />}
        
    </div>
  )
}
