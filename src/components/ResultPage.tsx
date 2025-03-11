import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchResult } from '../redux/actions/resultAction';

const ResultPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  
  const { token, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { result, loading, error } = useSelector((state: RootState) => state.result);

  useEffect(() => {
    if (!token) {
      console.error('No authentication token found');
      navigate('/login');
      return;
    }

    if (isAuthenticated) {
      dispatch(fetchResult(token)); 
    } else {
      navigate('/login');
    }
  }, [dispatch, navigate, token, isAuthenticated]);

  const handleRestart = () => {
    navigate('/dashboard');
  };

  if (loading) {
    return <div>Loading results...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!result) {
    return <div>No result data available</div>;
  }

  const totalQuestions = Object.keys(result).length;
  const correctAnswers = Object.values(result).filter((isCorrect) => isCorrect).length;
  const scorePercentage = (correctAnswers / totalQuestions) * 100;

  return (
    <div className="result-container">
      <h1>Quiz Results</h1>
      
      <div className="score-summary">
        <h2>Your Score: {correctAnswers} / {totalQuestions}</h2>
        <p>{scorePercentage.toFixed(2)}%</p> 
      </div>
      
      <div className="actions">
        <button onClick={handleRestart}>Restart Quiz</button>
      </div>
    </div>
  );
};

export default ResultPage;
