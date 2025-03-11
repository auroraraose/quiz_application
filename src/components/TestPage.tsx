import React, { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { selectAnswer, nextQuestion, previousQuestion, markAsVisited, markAsSkipped, setCurrentQuestionIndex } from '../redux/quizSlice';
import QuestionCard from './QuestionCard';
import { fetchQuestions, submitTest } from '../redux/actions/questionAction';

const TestPage: React.FC = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { token, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { questions, currentQuestionIndex, selectedAnswers } = useSelector((state: RootState) => state.quiz);
   console.log(questions);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
   if(token)
    dispatch(fetchQuestions(token))
  
    if (!isAuthenticated) {
      navigate('/login');  // Redirect if not authenticated
    }
  }, [isAuthenticated, navigate, questions.length]);

  const handleOptionChange = (answer: string, questionId: number) => {
    dispatch(selectAnswer({ questionId, answer }));
  };

  const goToNextQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];
  
    if (!selectedAnswers[currentQuestion.id]) {
      dispatch(markAsSkipped(currentQuestion.id)); 
    }
    dispatch(nextQuestion()); 
    navigate(`#${currentQuestion.id+1}`)
  };

  const goToPreviousQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];

    if (!selectedAnswers[currentQuestion.id] && currentQuestion.status === 'not-answered') {
      dispatch(markAsVisited(currentQuestion.id));  
    }

    if (currentQuestionIndex > 0) {
      dispatch(previousQuestion());
      navigate(`#${currentQuestion.id-1}`)
    }
  };

  const handleSubmitTest = () => {
    //handle result
    const result: { [key: number]: boolean } = {};
  
    questions.forEach((question) => {
      const selectedAnswer = selectedAnswers[question.id];
      const isCorrect = selectedAnswer === question.correctAnswer;
      result[question.id] = isCorrect;
    });
  
    // Dispatch the submitTest action with the result
    dispatch(submitTest(result));
  
    // Navigate to the results page
    navigate('/results');
  };
  

  const handleQuestionClick = (index: number) => {
    const question = questions[index];

    if (question.status === 'not-answered') {
      dispatch(markAsVisited(index + 1));  
    }

    dispatch(setCurrentQuestionIndex(index));
  };

  if (questions.length === 0) return <p>Loading questions...</p>;

  return (
    <div className="test-container" ref={divRef}>
      <h1>Test: {testId}</h1>

      {/* Display Question Numbers */}
      <div className="question-numbers">
        {questions.map((_, index) => {
          const status = questions[index].status;
          let statusClass = '';  

          if (status === 'answered') statusClass = 'answered';
          if (status === 'skipped') statusClass = 'skipped';
          if (status === 'visited') statusClass = 'visited';
          if (status === 'not-answered') statusClass = 'not-answered';

          return (
            <a href={`#${index+1}`}> {/*along with the ID in UI */}
            <button
              key={index}
              className={`question-number ${statusClass}`}  
              onClick={() => handleQuestionClick(index)}
            >
              {index + 1}  {/* Display the question number in UI*/}
            </button>
            </a>
          );
        })}
      </div>

      {/* Display Current Question */}
      <QuestionCard
        indexNum={currentQuestionIndex}
        question={questions[currentQuestionIndex]?.text}
        choices={questions[currentQuestionIndex]?.choices}
        selectedAnswer={selectedAnswers[questions[currentQuestionIndex].id]}
        onAnswerSelect={(answer) => handleOptionChange(answer, questions[currentQuestionIndex].id)}
      />

      {/* Navigation Buttons */}
      <div className="navigation-buttons">
        <button onClick={goToPreviousQuestion} disabled={currentQuestionIndex === 0}>Back</button>
        <button onClick={goToNextQuestion} disabled={currentQuestionIndex === questions.length - 1}>Next</button>
      </div>

      {/* Submit Button */}
      {currentQuestionIndex === questions.length - 1 && (
        <button onClick={handleSubmitTest}>Submit Test</button>
      )}
    </div>
  );
};

export default TestPage;
