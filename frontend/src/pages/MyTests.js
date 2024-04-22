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
        const response=await fetch(`https://edu-backend-mu.vercel.app/test/mytests/${user.user._id}`,{
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
    const deleteHandler=async(id)=>{
        const isConfirmed = window.confirm("Are you sure you want to delete this test?")

        if (isConfirmed){
            const response=await fetch(`https://edu-backend-mu.vercel.app/test/${id}`,{
            method: 'DELETE',
            headers:{
                'content-type':'application/json',
                "Authorization":`Bearer ${user.token}`
                
            }
        })
        if (response.ok){
            console.log('deleted')
            let newTests=[]
            for (const r of tests){
                if (r._id!==id){
                    newTests.push(r)
                }
            }
            setTests(newTests)
        }
        
        }
        
    }

  return (
    <div>
        {!showPreview && 

            <div>
                <div className='title'>My Tests</div>
                <div className='tests-container'>
            {tests.length!==0 && tests.map((t, i)=>(
                <div key={t._id}>
                <div onClick={()=>handleClick(t)} className='test'>
                    <p className='mytest-title'>Title: {t.title}</p>
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
                <div className='delete-section'onClick={()=>{
                    deleteHandler(t._id)}}>
                    <div>Delete</div>
                    <MdDelete size={24} className='delete-test' />
                </div>
                </div>
                ))}
                </div>
            </div>
        }
        {showPreview && <PreviewTest t={currentTest} closeHandler={()=>setShowPreview(false)}/>}
        
    </div>
  )
}

export default Tests
