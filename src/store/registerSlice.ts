/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { IInitalStateRegister, IRequestRegister, IResponse } from '@/types/types-store';
import requestNoAuth from '@/utils/helper/axios-noauth';

const initialState: IInitalStateRegister = {
  loading: false,
  data: {
    status: '',
    result: {},
    errors: null,
  },
  error: null,
};

export const postRegister = createAsyncThunk('auth/signup', async (data: IRequestRegister) => {
  const response = await requestNoAuth('post', '/auth/signup', data);
  return response.data;
});

export const registerSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postRegister.pending, (state) => {
        state.loading = true;
      })
      .addCase(postRegister.fulfilled.type, (state, action: PayloadAction<IResponse>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(postRegister.rejected.type, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default registerSlice.reducer;
