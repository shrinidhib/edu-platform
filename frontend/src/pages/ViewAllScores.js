import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './css/ViewAllScores.css'; // Import your CSS file
import { useAuthContext } from '../hooks/useAuthContext';

const ViewAllScores = () => {
  const [testScores, setTestScores] = useState([]);
  const [testTitle, setTestTitle] = useState('');
  const { testID } = useParams();
  const {user}=useAuthContext()

  useEffect(() => {
    const fetchTestDetails = async () => {
      try {
        const response = await fetch(`https://edu-backend-mu.vercel.app/test/title/${testID}`,{
            headers:{
                "Authorization":`Bearer ${user.token}`
            }
        });
        setTestTitle(response.data.title);
      } catch (error) {
        console.error('Error fetching test details:', error);
      }
    };

    fetchTestDetails();
  }, [testID]);

  useEffect(() => {
    const fetchTestScores = async () => {
      try {
        const response = await fetch(`https://edu-backend-mu.vercel.app/score/test/${testID}`,{
            headers:{
                "Authorization":`Bearer ${user.token}`
            }
        });
        const sortedScores = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setTestScores(sortedScores);
      } catch (error) {
        console.error('Error fetching test scores:', error);
      }
    };

    fetchTestScores();
  }, [testID]);

  return (
    <div className="view-all-scores-container">
      <h2>All Scores for Test: {testTitle}</h2>
      <table className="scores-table">
        <thead>
          <tr>
            <th className="user-id">User ID</th>
            <th className="score">Score</th>
            <th className="created-at">Created At</th>
          </tr>
        </thead>
        <tbody>
          {testScores.map(score => (
            <tr key={score._id} className="score-row">
              <td className="user-id">{score.userID}</td>
              <td className="score">{score.marks}</td>
              <td className="created-at">{new Date(score.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewAllScores;