import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchQuestions, submitTest } from './actions/questionAction';

interface QuestionState {
  id: number;
  text: string;
  choices: string[];
  correctAnswer: string;
  status: 'visited' | 'answered' | 'skipped' | 'not-answered';
}

export interface QuizState {
  questions: QuestionState[];
  currentQuestionIndex: number;
  selectedAnswers: { [key: number]: string };
  score: number;
  percentage: number; 
  totalQuestions: number;
  loading: boolean;
  error: string | null;
}

const initialState: QuizState = {
  questions: [],
  currentQuestionIndex: 0,
  selectedAnswers: {},
  score: 0,
  percentage: 0,
  totalQuestions: 0,
  loading: false,
  error: null,
};



const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    selectAnswer: (state, action: PayloadAction<{ questionId: number; answer: string }>) => {
      const { questionId, answer } = action.payload;
      
      state.selectedAnswers[questionId] = answer;
      state.questions[questionId - 1].status = 'answered'; 
    },
    nextQuestion: (state) => {
      if (state.currentQuestionIndex < state.questions.length - 1) {
        state.currentQuestionIndex += 1;
      }
    },
    previousQuestion: (state) => {
      if (state.currentQuestionIndex > 0) {
        state.currentQuestionIndex -= 1;
      }
    },
    markAsVisited: (state, action: PayloadAction<number>) => {
      const questionId = action.payload;
      state.questions[questionId - 1].status = 'visited'; 
    },
    markAsSkipped: (state, action: PayloadAction<number>) => {
      const questionId = action.payload;
      state.questions[questionId - 1].status = 'skipped'; 
    },
    setCurrentQuestionIndex: (state, action: PayloadAction<number>) => {
      state.currentQuestionIndex = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.questions = action.payload.map((question: any) => ({
          ...question,
          status: 'not-answered', 
        }));
        state.totalQuestions = action.payload.length;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(submitTest.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitTest.fulfilled, (state, action) => {
        state.loading = false;
        state.score = action.payload.score;
        state.percentage = action.payload.percentage;
      })
      .addCase(submitTest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { 
  selectAnswer, 
  nextQuestion, 
  previousQuestion, 
  markAsVisited, 
  markAsSkipped, 
  setCurrentQuestionIndex 
} = quizSlice.actions;

export default quizSlice.reducer;
