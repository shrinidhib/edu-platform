import React, { useEffect, useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'

export const Tests = () => {
    const navigate=useNavigate()
    const [tests,setTests]=useState([])
    const fetchTests=async()=>{
        const response=await fetch('http://localhost:4005/test/')
        const json=await response.json()
        setTests(json)
    }
    useEffect(()=>{
        fetchTests()
        console.log(tests)
    },[])

    const onClickHandler=(t)=>{
        console.log(t)
        navigate('/preview', {replace: true, state: {test: t}})
    }

  return (
    <div>
        {tests.map((t)=>(
            <div onClick={()=>onClickHandler(t)}>{t.title}</div>
        ))}
    </div>
  )
}
