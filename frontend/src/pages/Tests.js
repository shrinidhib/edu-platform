import React, { useEffect, useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { PreviewTest } from './PreviewTest'
import './css/Tests.css'

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
                <div className='title'>My Tests</div>
                <div className='tests-container'>
            {tests.map((t, i)=>(
                <div onClick={()=>handleClick(t)} className='test'>
                    <p>{i+1}</p>
                    <p className='test-title'>Title: {t.title}</p>
                    <div className='lines'>
                        <div className='line'></div>
                        <div className='line'></div>
                        <div className='line'></div>
                        <div className='line'></div>
                        <div className='line'></div>
                        <div className='line'></div>
                        <div className='line'></div>
                    </div>
                    <p>Created at: {t.createdAt.substring(0,10)}</p>
                </div>
                ))}
                </div>
            </div>
        }
        {showPreview && <PreviewTest t={currentTest} closeHandler={()=>setShowPreview(false)}/>}
        
    </div>
  )
}
