/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { IInitialState, IInitialStateAuth, IResponse } from '@/types/types-store';
import requestAuth from '@/utils/helper/axios-auth';

const initialState: IInitialState = {
  loading: false,
  data: {
    status: '',
    result: {},
    errors: {},
  },
  error: null,
};

export const getDataProducts = createAsyncThunk('product/getDataProducts', async (id, { getState }) => {
  const { auth } = getState() as { auth: IInitialStateAuth };
  const response = await requestAuth('get', '/v1/products', auth.data.result.access_token);
  return response.data;
});

export const createNewProduct = createAsyncThunk('product/createNewProduct', async (data: any, { getState }) => {
  const { auth } = getState() as { auth: IInitialStateAuth };
  const response = await requestAuth('post', '/v1/products', auth.data.result.access_token, data);
  return response.data;
});

export const editProduct = createAsyncThunk('product/editProduct', async (data: any, { getState }) => {
  const { auth } = getState() as { auth: IInitialStateAuth };
  const response = await requestAuth('put', `/v1/products/${data.id}`, auth.data.result.access_token, data);
  return response.data;
});

export const deleteProduct = createAsyncThunk('product/deleteProduct', async (id: number, { getState }) => {
  const { auth } = getState() as { auth: IInitialStateAuth };
  const response = await requestAuth('delete', `/v1/products/${id}`, auth.data.result.access_token);
  return response.data;
});

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDataProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDataProducts.fulfilled.type, (state, action: PayloadAction<IResponse>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getDataProducts.rejected.type, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(createNewProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(createNewProduct.fulfilled.type, (state, action: PayloadAction<IResponse>) => {
        state.loading = false;
        // state.data = action.payload;
      })
      .addCase(createNewProduct.rejected.type, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
