import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch quiz results
export const fetchResult = createAsyncThunk(
    'result/fetchResult',
    async (token: string, { rejectWithValue }) => {
      try {
        const response = await axios.get('http://localhost:8080/result', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data.score; 
      } catch (error) {
        return rejectWithValue('Error fetching results');
      }
    }
  );
 
  