import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext.js'

export const UserDetails = () => {
    const {user}=useAuthContext()
    const [tests, setTests] = useState([]);
    const [userScores, setUserScores] = useState([]);
    const [lowestScores, setLowestScores] = useState([]);
    const [totalMarks,setTotalMarks]=useState([]);
    

    const fetchTests = async () => {
        try {
            // Fetch all tests
            const testsResponse = await fetch("https://edu-backend-mu.vercel.app/test/",{
                headers:{
                    "Authorization":`Bearer ${user.token}`
                }
            });
            const testsJson = await testsResponse.json();
            setTests(testsJson);

            // Fetch scores for the user (with hardcoded user ID)
            const scoresResponse = await fetch(`https://edu-backend-mu.vercel.app/score/${user.user._id}`,{
                headers:{
                    "Authorization":`Bearer ${user.token}`
                }
            });
            const scoresJson = await scoresResponse.json();
            setUserScores(scoresJson);

            // Fetch user details (with hardcoded user ID)
            // const userResponse = await fetch("https://edu-backend-mu.vercel.app/user/getUser/661a9cbf15928d25c9c032e0");
            // const userJSON = await userResponse.json();
            // setUserDetails(userJSON);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        fetchTests();
    }, [user]); // Fetch tests, scores, and user details only once when the component mounts

    useEffect(() => {
        // Sort user scores by marks in ascending order
        const sortedScores = userScores.sort((a, b) => a.marks - b.marks);
        // Get the 3 least scoring tests
        const lowestScores = sortedScores.slice(0, 3);
        setLowestScores(lowestScores);

        const totalMarksScored = userScores.reduce((total, score) => total + score.marks, 0);
        setTotalMarks(totalMarksScored);
    }, [userScores]);

    // Calculate the percentage of scores out of total tests available
    const percentage1 = (userScores.length / tests.length) * 100;
    const percentage2 = (totalMarks / (userScores.length * 10)) * 100;

    return (
        <div>
            
            <div style={{ backgroundColor: 'rgba(230, 245, 255, 0.8)', minHeight: '100vh', padding: '20px' }}>
                <div style={{ backgroundColor: 'white', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', padding: '20px', marginBottom: '20px' }}>
                    {user && (
                        <div style={{ backgroundColor: '#388087', color: 'white', padding: '20px', borderRadius: '10px', marginBottom: '20px' }}>
                            <h2>User Details</h2>
                            {/* Display user details inside the blue box */}
                            <p>Name: {user.user.username}</p>
                            <p>Email: {user.user.email}</p>
                            <p>Designation: {user.user.designation}</p>
                            {/* Add more user details here */}
                        </div>
                    )}
                    <div >
                        {/* Display the least scoring tests below the user details */}
                        <h2 style={{display:'block'}}>Least Scoring Tests</h2>
                        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                        {lowestScores.map(score => (
                            <div key={score._id} style={{ backgroundColor: '#388087', color: 'white', padding: '10px', margin: '10px', borderRadius: '5px', minWidth: '150px', textAlign: 'center' }}>
                                <p>Test Name: {tests.find(test => test._id === score.testID)?.title}</p>
                                <p>Marks: {score.marks}</p>
                                {/* Add more test details here */}
                            </div>
                        ))}
                        </div>
                    </div>
                    {/* Display the progress bar representing the percentage of scores */}
                    <div style={{ marginTop: '20px' }}>
                        <h2>Test Statistics</h2>
                        <p>Percentage of tests taken: {percentage1.toFixed(2)}%</p>
                        <div style={{ width: '100%', backgroundColor: '#6fb3b8', borderRadius: '5px', marginTop: '10px' }}>
                            <div style={{ width: `${percentage1}%`, backgroundColor: '#388087', height: '20px', borderRadius: '5px' }}></div>
                        </div>
                        <p>Percentage of marks scored on average: {percentage2.toFixed(2)}%</p>
                        <div style={{ width: '100%', backgroundColor: '#6fb3b8', borderRadius: '5px', marginTop: '10px' }}>
                            <div style={{ width: `${percentage2}%`, backgroundColor: '#388087', height: '20px', borderRadius: '5px' }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}