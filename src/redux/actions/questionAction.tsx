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
        const token = localStorage.getItem('token'); 
  
        for (const [questionId, isCorrect] of Object.entries(payload)) {
          const id = parseInt(questionId);
  
          const answer = isCorrect ? 1 : 0; 
          await axios.post(
            `http://localhost:8080/response`, 
            { question_id: id, answer },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (isCorrect) {
            score += 1;
          }
        }
  
        const percentage = (score / quiz.totalQuestions) * 100;
        return { score, percentage };
      } catch (error: any) {
        return rejectWithValue('Error submitting test results');
      }
    }
  );