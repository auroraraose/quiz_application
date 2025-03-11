import { createSlice,  PayloadAction } from '@reduxjs/toolkit';
import { fetchResult } from './actions/resultAction';

interface ResultState {
  result: { [key: string]: boolean } | null;
  loading: boolean;
  error: string | null;
}

const initialState: ResultState = {
  result: null,
  loading: false,
  error: null,
};

const resultSlice = createSlice({
  name: 'result',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchResult.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchResult.fulfilled, (state, action: PayloadAction<{ [key: string]: boolean }>) => {
        state.loading = false;
        state.result = action.payload;
      })
      .addCase(fetchResult.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
  },
});

export default resultSlice.reducer;
