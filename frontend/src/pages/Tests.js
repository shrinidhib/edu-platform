import React, { useEffect, useState } from 'react'
import { MdDelete } from "react-icons/md";
import { PreviewTest } from './PreviewTest'
import './css/Tests.css'
import { useAuthContext } from '../hooks/useAuthContext';

const Tests = () => {
    const [showPreview,setShowPreview]=useState(false)
    const [tests,setTests]=useState([])
    const [currentTest, setCurrentTest]=useState(null)
    const {user}=useAuthContext()
    const fetchTests=async()=>{
        const response=await fetch(`http://localhost:4005/test/`,{
            method: 'GET',
            headers:{
                'content-type':'application/json',
                "Authorization":`Bearer ${user.token}`
                
            }
        })
        const json=await response.json()
        setTests(json)
    }
    useEffect(()=>{
        if (user){
            fetchTests()
        }
    },[user])

    const handleClick=(t)=>{
        setCurrentTest(t)
        setShowPreview(true)
    }
        

  return (
    <div>
        <div>
                <div className='title'>All Tests</div>
                <div className='tests-container'>
            {tests.length!==0 && tests.map((t, i)=>(
                <div key={t._id}>
                <div onClick={()=>handleClick(t)} className='test'>
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
                    <p className='created-at'>Created at: {t.createdAt.substring(0,10)}</p>
                </div>
                </div>
                ))}
                </div>
            </div>
    </div>
  )
}

export default Tests
