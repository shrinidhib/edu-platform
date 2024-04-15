import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './css/ViewAllScores.css'; // Import your CSS file

const ViewAllScores = ({ match }) => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await axios.get(`http://localhost:4005/score/${match.params.testId}`);
        setScores(response.data);
      } catch (error) {
        console.error('Error fetching scores:', error);
      }
    };

    fetchScores();
  }, [match.params.testId]);

  return (
    <div className="view-all-scores-container">
      {/* <h2>All Scores for Test: {testTitle}</h2>
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
      </table> */}
    </div>
  );
};

export default ViewAllScores;
