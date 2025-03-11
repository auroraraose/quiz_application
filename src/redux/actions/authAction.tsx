import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for logging in
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (credentials: { email: string; password: string }, { rejectWithValue }) => {
      try {
        const response = await axios.post('http://localhost:8080/login', credentials);
        return response.data.token; 
      } catch (err: any) {
        return rejectWithValue('Invalid credentials. Please try again.'); 
      }
    }
  );
  
  // Async thunk for registering a new user
  export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (credentials: { email: string; password: string }, { rejectWithValue }) => {
      try {
        const response = await axios.post('http://localhost:8080/register', credentials);
        return response.data.token; 
      } catch (err: any) {
        return rejectWithValue('Registration failed. Please try again.'); 
      }
    }
  );
  