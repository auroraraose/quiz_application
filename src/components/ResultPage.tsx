import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const ResultPage: React.FC = () => {
  const { score } = useSelector((state: RootState) => state.quiz); // Get the score from Redux state

  return (
    <div className="result-container">
      <h1>Test Results</h1>
      <p>Your Score: {score}</p>
    </div>
  );
};

export default ResultPage;
