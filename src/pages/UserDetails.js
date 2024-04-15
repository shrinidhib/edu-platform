// import React, { useEffect, useState } from 'react'
// import { Link, useNavigate, useParams } from 'react-router-dom'
// import axios from 'axios'; // Import axios for HTTP requests

// export const UserDetails = () => {
//     const navigate = useNavigate()
//     const { id } = useParams(); // Get the user ID from the URL params
//     const [tests, setTests] = useState([])
//     const [userScores, setUserScores] = useState([])
//     const [userDetails,setUserDetails]=useState('null')

//     const fetchTests = async () => {
//         try {
//             // Fetch all tests
//             const testsResponse = await fetch("http://localhost:4005/test/")
//             const testsJson = await testsResponse.json()
//             setTests(testsJson)

//             // Fetch scores for the user
//             const scoresResponse = await fetch("http://localhost:4005/score/1234567890")
//             const scoresJson = await scoresResponse.json()
//             setUserScores(scoresJson)

//             const userResponse = await fetch("http://localhost:4005/user/getUser/661a9cbf15928d25c9c032e0")
//             const userJSON = await userResponse.json()
//             setUserDetails(userJSON)
            

//         } catch (error) {
//             console.error('Error fetching data:', error)
//         }
//     }

//     useEffect(() => {
//         fetchTests()
//     }, [id]) // Call fetchTests whenever the user ID changes

//     // Calculate the percentage of scores out of total tests available
//     const percentage = (userScores.length / tests.length) * 100;

//     return (
//         <div>
//             <h2>User Details</h2>
//             <p>Number of scores fetched: {userScores.length}</p>
//             <p>Number of tests fetched: {tests.length}</p>
//             <p>Percentage of scores out of total tests available: {percentage.toFixed(2)}%</p>
//             <p>User Details:{userDetails.email} </p>
//         </div>
//     )
// }
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'; // Import axios for HTTP requests

export const UserDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Get the user ID from the URL params
    const [tests, setTests] = useState([]);
    const [userScores, setUserScores] = useState([]);
    const [userDetails, setUserDetails] = useState(null);
    const [lowestScores, setLowestScores] = useState([]);
    const [totalMarks,setTotalMarks]=useState([]);

    const fetchTests = async () => {
        try {
            // Fetch all tests
            const testsResponse = await fetch("http://localhost:4005/test/");
            const testsJson = await testsResponse.json();
            setTests(testsJson);

            // Fetch scores for the user (with hardcoded user ID)
            const scoresResponse = await fetch("http://localhost:4005/score/661a9cbf15928d25c9c032e0");
            const scoresJson = await scoresResponse.json();
            setUserScores(scoresJson);

            // Fetch user details (with hardcoded user ID)
            const userResponse = await fetch("http://localhost:4005/user/getUser/661a9cbf15928d25c9c032e0");
            const userJSON = await userResponse.json();
            setUserDetails(userJSON);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        fetchTests();
    }, []); // Fetch tests, scores, and user details only once when the component mounts

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
                    {userDetails && (
                        <div style={{ backgroundColor: '#007bff', color: 'white', padding: '20px', borderRadius: '10px', marginBottom: '20px' }}>
                            <h2>User Details</h2>
                            {/* Display user details inside the blue box */}
                            <p>Name: Vardhan Dongre</p>
                            <p>Email: {userDetails.email}</p>
                            <p>Designation: {userDetails.designation}</p>
                            {/* Add more user details here */}
                        </div>
                    )}
                    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                        {/* Display the least scoring tests below the user details */}
                        <h2>Least Scoring Tests</h2>
                        {lowestScores.map(score => (
                            <div key={score._id} style={{ backgroundColor: '#007bff', color: 'white', padding: '10px', margin: '10px', borderRadius: '5px', minWidth: '150px', textAlign: 'center' }}>
                                <p>Test Name: {tests.find(test => test._id === score.testID)?.title}</p>
                                <p>Marks: {score.marks}</p>
                                {/* Add more test details here */}
                            </div>
                        ))}
                    </div>
                    {/* Display the progress bar representing the percentage of scores */}
                    <div style={{ marginTop: '20px' }}>
                        <h2>Test Statistics</h2>
                        <p>Percentage of tests taken: {percentage1.toFixed(2)}%</p>
                        <div style={{ width: '100%', backgroundColor: '#007bff', borderRadius: '5px', marginTop: '10px' }}>
                            <div style={{ width: `${percentage1}%`, backgroundColor: '#4CAF50', height: '20px', borderRadius: '5px' }}></div>
                        </div>
                        <p>Percentage of marks scored on average: {percentage2.toFixed(2)}%</p>
                        <div style={{ width: '100%', backgroundColor: '#007bff', borderRadius: '5px', marginTop: '10px' }}>
                            <div style={{ width: `${percentage2}%`, backgroundColor: '#4CAF50', height: '20px', borderRadius: '5px' }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
