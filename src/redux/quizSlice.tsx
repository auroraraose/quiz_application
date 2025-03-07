import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the state structure
interface QuizState {
  questions: {
    id: number;
    text: string;
    choices: string[];
  }[];
  selectedAnswers: string[];
  currentQuestionIndex: number;
  score: number;
}

// Initial state
const initialState: QuizState = {
  questions: [],
  selectedAnswers: [],
  currentQuestionIndex: 0,
  score: 0,
};

// Create the slice
const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setQuestions(state, action: PayloadAction<QuizState['questions']>) {
      state.questions = action.payload;
    },
    selectAnswer(state, action: PayloadAction<{ questionId: number; answer: string }>) {
      const { questionId, answer } = action.payload;
      state.selectedAnswers[questionId - 1] = answer; // Store the selected answer for the question
    },
    nextQuestion(state) {
      if (state.currentQuestionIndex < state.questions.length - 1) {
        state.currentQuestionIndex += 1;
      }
    },
    previousQuestion(state) {
      if (state.currentQuestionIndex > 0) {
        state.currentQuestionIndex -= 1;
      }
    },
    submitTest(state) {
      // Calculate the score based on the selected answers and the correct answers
      const score = state.selectedAnswers.filter(
        (answer, index) => answer === state.questions[index]?.choices[0] // Assuming the correct answer is the first choice
      ).length;

      state.score = score;
    },
    resetQuiz(state) {
      state.selectedAnswers = [];
      state.currentQuestionIndex = 0;
      state.score = 0;
      state.questions = [];
    },
  },
});

// Export actions to be dispatched
export const {
  setQuestions,
  selectAnswer,
  nextQuestion,
  previousQuestion,
  submitTest,
  resetQuiz,
} = quizSlice.actions;

// Export the reducer to be used in the store
export default quizSlice.reducer;
