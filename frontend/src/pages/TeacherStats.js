import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext.js';
import "./css/TeacherStats.css"

const TeacherStats = () => {
    const { user } = useAuthContext();
    const [tests, setTests] = useState([]);
    const [testStats, setTestStats] = useState({}); // Store stats for each test

    useEffect(() => {
        const fetchTestsAndScores = async () => {
            try {
                // Fetch all tests
                const testsResponse = await fetch(`https://edu-backend-mu.vercel.app/test/mytests/${user.user._id}`, {
                    headers: {
                        "Authorization": `Bearer ${user.token}`
                    }
                });
                const testsJson = await testsResponse.json();
                console.log(testsJson)
                setTests(testsJson);

                // Fetch all scores for all tests
                const scoresResponse = await fetch(`https://edu-backend-mu.vercel.app/score/`, {
                    headers: {
                        "Authorization": `Bearer ${user.token}`
                    }
                });
                const scoresJson = await scoresResponse.json();

                // Calculate stats for each test
                const stats = {};
                testsJson.forEach(test => {
                    const testScores = scoresJson.filter(score => score.testID === test._id);
                    let highestScore = Math.max(...testScores.map(score => score.marks));
                    let lowestScore = Math.min(...testScores.map(score => score.marks));
                    const totalMarks = testScores.reduce((total, score) => total + score.marks, 0);
                    let averageScore = totalMarks / testScores.length;
                    if (highestScore==-Infinity || highestScore==Infinity){
                        highestScore="NA"
                    }
                    if (lowestScore==-Infinity || lowestScore==Infinity){
                        lowestScore="NA"
                    }
                    if (highestScore=="NA"){
                        averageScore="NA"
                    }
                    console.log(highestScore,lowestScore)

                    stats[test._id] = {
                        highestScore,
                        lowestScore,
                        averageScore,
                        numStudents: testScores.length // Number of students for the test
                    };
                });

                setTestStats(stats);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchTestsAndScores();
    }, [user]);

    return (
        <div className="teacher-stats-container">
            <h2 className="page-title">Teacher Stats</h2>
            {tests.map(test => (
                <div key={test._id} className="test-stats">
                    <h3 className="test-title">{test.title}</h3>
                    <p className="stat">Number of Students: {testStats[test._id]?.numStudents}</p>
                    <p className="stat">Highest Score: {testStats[test._id]?.highestScore}</p>
                    <p className="stat">Lowest Score: {testStats[test._id]?.lowestScore}</p>
                    <p className="stat">Average Score: {testStats[test._id]?.averageScore}</p>
                </div>
            ))}
        </div>
    );
};

export default TeacherStats;