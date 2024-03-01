import React, { useState } from "react";

export const CreateTest = () => {
  const [questions, setQuestions] = useState([]);
  const [number, setNumber] = useState(1);
  return (
    <form className="question-form">
        <h1 className="question-header">Question {number}</h1>

        <div className="question-section">
            <label className="question-label">Question: </label>
            <textarea className='question' placeholder="Enter question..."></textarea>
        </div>

        <div className="options-section">
            <input className='option' placeholder="Option 1..."></input>
            <input className='option' placeholder="Option 2..."></input>
            <input className='option' placeholder="Option 3..."></input>
            <input className='option' placeholder="Option 4..."></input>
        </div>

    </form>
  )
};
