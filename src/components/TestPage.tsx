import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setQuestions, selectAnswer, nextQuestion, previousQuestion, submitTest } from '../redux/quizSlice';
import QuestionCard from './QuestionCard';

const TestPage: React.FC = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { questions, currentQuestionIndex, selectedAnswers } = useSelector(
    (state: RootState) => state.quiz
  );

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:8080/questions');
        dispatch(setQuestions(response.data)); // Dispatch the questions to Redux store
      } catch (err) {
        console.error('Error fetching questions:', err);
      }
    };

    fetchQuestions();
  }, [testId, dispatch]);

  const handleOptionChange = (answer: string, questionId: number) => {
    dispatch(selectAnswer({ questionId, answer }));
  };

  const goToNextQuestion = () => {
    dispatch(nextQuestion());
  };

  const goToPreviousQuestion = () => {
    dispatch(previousQuestion());
  };

  const handleSubmitTest = () => {
    dispatch(submitTest()); // Dispatch the submitTest action to calculate score
    navigate('/results');
  };

  if (questions.length === 0) return <p>Loading questions...</p>;

  return (
    <div className="test-container">
      <h1>Test: {testId}</h1>
      <QuestionCard
        question={questions[currentQuestionIndex]?.text}
        choices={questions[currentQuestionIndex]?.choices}
        selectedAnswer={selectedAnswers[currentQuestionIndex]}
        onAnswerSelect={(answer) => handleOptionChange(answer, questions[currentQuestionIndex].id)}
      />
      <div className="navigation-buttons">
        <button onClick={goToPreviousQuestion} disabled={currentQuestionIndex === 0}>Back</button>
        <button onClick={goToNextQuestion} disabled={currentQuestionIndex === questions.length - 1}>Next</button>
      </div>
      {currentQuestionIndex === questions.length - 1 && (
        <button onClick={handleSubmitTest}>Submit Test</button>
      )}
    </div>
  );
};

export default TestPage;
