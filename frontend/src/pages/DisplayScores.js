import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { formatDistanceToNow } from 'date-fns'; // Import formatDistanceToNow from date-fns
import './css/DisplayScores.css';
import { useAuthContext } from '../hooks/useAuthContext';

const DisplayScores = () => {
  const [latestScores, setLatestScores] = useState([]);
  const [testTitles, setTestTitles] = useState({});
  const {user}=useAuthContext()

  useEffect(() => {
    const fetchLatestScores = async () => {
      try {
        const response = await fetch(`http://localhost:4005/score/${user.user._id}`,{
            headers:{
                "Authorization":`Bearer ${user.token}`
            }
        });
        const json= await response.json()
        console.log(json)
        const sortedScores = json.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        const uniqueTestIDs = [...new Set(sortedScores.map(score => score.testID))];
        const latestScoresData = uniqueTestIDs.map(testID => {
          const scoresForTest = sortedScores.filter(score => score.testID === testID);
          const latestScore = scoresForTest[0];
          return latestScore;
        });
        setLatestScores(latestScoresData);
      } catch (error) {
        console.error('Error fetching latest scores:', error);
      }
    };

    if (user){
      fetchLatestScores();
    }

    
  }, [user]);

  useEffect(() => {
    const fetchTestTitles = async () => {
      const titles = {};
      await Promise.all(
      latestScores.map(async (score) => {
          try {
            const response = await fetch(`http://localhost:4005/test/title/${score.testID}`,{
                headers:{
                    "Authorization":`Bearer ${user.token}`
                }
            });
            const json=await response.json()
            titles[score.testID] = json.title;
            console.log(titles)
            console.log(`Fetched title for testID ${score.testID}:`, json.title);
          } catch (error) {
            console.error('Error fetching test title:', error);
            titles[score.testID] = ''; // Set a default value in case of error
          }
        }))
      console.log(titles)
      setTestTitles(titles)
    }

    fetchTestTitles();
  }, [latestScores]);

  return (
    <div className="display-scores-container">
      <h2>Scores for User: {user.user.email}</h2>
      <table className="scores-table">
        <thead>
          <tr>
            <th>Test Title</th>
            <th>Score</th>
            <th>Taken At</th>
          </tr>
        </thead>
        <tbody>
          {latestScores.map(score => (
            <tr key={score._id} className="score-row">
              <td className="test-title">{testTitles[score.testID]}</td>
              <td className="score">{score.marks}</td>
              <td>{formatDistanceToNow(new Date(score.createdAt), { addSuffix: true })}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayScores;