import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { QuizState } from "../quizSlice";

// Async thunk to fetch questions
export const fetchQuestions = createAsyncThunk(
    'quiz/fetchQuestions',
    async (token: string | null, { rejectWithValue }) => {
      try {
        const response = await axios.get('http://localhost:8080/questions', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data; 
      } catch (error) {
        return rejectWithValue('Error fetching questions');
      }
    }
  );
  
  // Async thunk to submit test results
  export const submitTest = createAsyncThunk(
    'quiz/submitTest',
    async (payload: { [key: number]: boolean }, { getState, rejectWithValue }) => {
      try {
        const { quiz } = getState() as { quiz: QuizState };
        let score = 0;
  
        Object.keys(payload).forEach((questionId) => {
          const id = parseInt(questionId); 
          if (payload[id]) {
            score += 1;
          }
        });
  
        const percentage = (score / quiz.totalQuestions) * 100;
  
        return { score, percentage }; 
      } catch (error) {
        return rejectWithValue('Error submitting test');
      }
    }
  );