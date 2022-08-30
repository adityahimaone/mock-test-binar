/* eslint-disable import/prefer-default-export */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

import { IInitialState, IRequestLogin, IResponse, InitialStateLogin } from '@/types/types-store';
import requestNoAuth from '@/utils/helper/axios-noauth';

const initialState: InitialStateLogin = {
  loading: false,
  data: {
    status: '',
    result: {
      access_token: '',
    },
    errors: {},
  },
  error: null,
};

export const getAuthLogin = createAsyncThunk('auth/login', async (data: IRequestLogin) => {
  const response = await requestNoAuth('post', '/auth/login', data);
  return response.data;
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAuthLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAuthLogin.fulfilled.type, (state, action: PayloadAction<IResponse>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAuthLogin.rejected.type, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
