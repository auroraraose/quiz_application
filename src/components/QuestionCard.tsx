import React from 'react';

interface QuestionCardProps {
  question: string;
  choices: string[];
  selectedAnswer: string;
  onAnswerSelect: (answer: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, choices, selectedAnswer, onAnswerSelect }) => {
  return (
    <div className="question-card">
      <p>{question}</p>
      {choices.map((choice, index) => (
        <div key={index}>
          <input
            type="radio"
            name="question"
            value={choice}
            checked={selectedAnswer === choice}
            onChange={() => onAnswerSelect(choice)}
          />
          <label>{choice}</label>
        </div>
      ))}
    </div>
  );
};

export default QuestionCard;
