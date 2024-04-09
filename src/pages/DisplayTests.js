import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './css/Tests.css'

export const DisplayTests = () => {
    const navigate = useNavigate()
    const [tests, setTests] = useState([])
    const [userScores, setUserScores] = useState([])

    const fetchTests = async () => {
        try {
            // Fetch all tests
            const testsResponse = await fetch(`http://localhost:4005/test/mytests/${3}`)
            const testsJson = await testsResponse.json()
            setTests(testsJson)

            // Fetch scores for the user
            const scoresResponse = await fetch("http://localhost:4005/score/1234567890")
            const scoresJson = await scoresResponse.json()
            setUserScores(scoresJson)
        } catch (error) {
            console.error('Error fetching tests:', error)
        }
    }

    useEffect(() => {
        fetchTests()
    }, [])

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
