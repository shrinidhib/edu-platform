import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './css/TakeTest.css'; // Import your CSS file
import { useAuthContext } from '../hooks/useAuthContext';

const TakeTest = () => {
  const [test, setTest] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);
  const { testID } = useParams();
  console.log(testID)
  const navigate = useNavigate();
  const {user}=useAuthContext()

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const response = await fetch(`https://edu-backend-mu.vercel.app/test/${testID}`,{
          method: 'GET',
          headers:{
            "Authorization":`Bearer ${user.token}`
        }
        });
        const json=await response.json()
        setTest(json[0])
        console.log(json[0])
      } catch (error) {
        console.error('Error fetching test:', error);
      }
    };

    fetchTest();
  }, [testID]);

  const handleOptionSelect = (questionId, selectedOption) => {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: selectedOption });
  };

  const handleSubmit = async () => {
    // Check if all questions have been attempted
    const unansweredQuestions = test.questions.filter(question => !selectedAnswers[question._id]);
    if (unansweredQuestions.length > 0) {
      alert('Please attempt all questions before submitting.');
      return;
    }

    let scoreValue = 0;
    test.questions.forEach(question => {
      const questionId = question._id;
      const selectedAnswer = selectedAnswers[questionId];
      if (selectedAnswer === question.answer) {
        scoreValue++;
        console.log(scoreValue)
      }
    });

    // Send the score to the backend
    try {
      console.log(scoreValue)
      const scoreData={
          marks: scoreValue,
          testID: testID,
          userID: user.user._id 
      }
      console.log(scoreData)
      const response = await fetch('https://edu-backend-mu.vercel.app/score', {
        method: 'POST',
        body:JSON.stringify(scoreData),
        headers:{
          'content-type':'application/json'
        }
        // Replace with the actual user ID
      });
      console.log('Score stored successfully:', response.data);
    } catch (error) {
      console.error('Error storing score:', error);
    }

    setScore(scoreValue);
    navigate('/displayscores');
  };

  return (
    <div className="take-test-container">
      {test && (
        <div>
          <h1 className="take-test-title">{test.title}</h1>
          <div>
            {test && test.questions.map((question, index) => (
              <div key={question._id} className="question-container">
                <p className="question-number">Question {index + 1}:</p>
                <p className="question-text">{question.question}</p>
                <ul className="options-list">
                  {question.options.map((option, optionIndex) => (
                    <li key={optionIndex} className={`option-item ${selectedAnswers[question._id] === option ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        required
                        id={`${question._id}-${optionIndex}`}
                        name={question._id}
                        value={option}
                        onChange={() => handleOptionSelect(question._id, option)}
                        className="option-input"
                      />
                      <label htmlFor={`${question._id}-${optionIndex}`} className="option-label">{option}</label>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <button onClick={handleSubmit} className="submit-button">Submit</button>
          {score !== null && <p className="score-text">Your score: {score}/{test.questions.length}</p>}
        </div>
      )}
    </div>
  );
};

export default TakeTest;