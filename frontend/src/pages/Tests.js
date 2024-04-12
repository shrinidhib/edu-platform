import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './css/Tests.css'
import { useAuthContext } from '../hooks/useAuthContext';

const Tests = () => {
    
    const navigate = useNavigate()
    const [tests, setTests] = useState([])
    const [userScores, setUserScores] = useState([])
    const {user}=useAuthContext()

    const fetchTests = async () => {
        try {
            // Fetch all tests
            const testsResponse = await fetch(`https://edu-backend-mu.vercel.app/test/`,{
                headers:{
                    "Authorization":`Bearer ${user.token}`
                }
            })
            const testsJson = await testsResponse.json()
            setTests(testsJson)

            // Fetch scores for the user
            const scoresResponse = await fetch(`https://edu-backend-mu.vercel.app/score/${user.user._id}`,{
                headers:{
                    "Authorization":`Bearer ${user.token}`
                }
            })
            const scoresJson = await scoresResponse.json()
            setUserScores(scoresJson)
        } catch (error) {
            console.error('Error fetching tests:', error)
        }
    }

    useEffect(() => {
        if(user){
            fetchTests()
        }
        
    }, [user])

    const handleClick = (test) => {
        navigate(`/taketest/${test._id}`)
    }
        

  return (
    <div>
    <div>
        <div className='title'>My Tests</div>
        <div className='tests-container'>
            {tests.map((test, index) => {
                // Check if the test ID is present in the userScores
                const testScore = userScores.find(score => score.testID === test._id)
                if (!testScore) {
                    return (
                        <div key={index} onClick={() => handleClick(test)} className='test'>
                            <p className='test-title'>Title: {test.title}</p>
                            <div className='lines'>
                                <div className='line'></div>
                                <div className='line'></div>
                                <div className='line'></div>
                                <div className='line'></div>
                                <div className='line'></div>
                                <div className='line'></div>
                                <div className='line'></div>
                            </div>
                            <p className='created-at'>Created at: {test.createdAt.substring(0, 10)}</p>
                        </div>
                    )
                } else {
                    return null // Don't render the test if the user has already given the score
                }
            })}
        </div>
    </div>
</div>
  )
}

export default Tests
