/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { IInitialState, IInitialStateAuth, IInitialStateProduct, IResponse } from '@/types/types-store';
import requestAuth from '@/utils/helper/axios-auth';

const initialState: IInitialStateProduct = {
  loading: false,
  data: {
    status: '',
    result: {},
    errors: {},
  },
  saveData: {},
  error: null,
};

export const getDataProducts = createAsyncThunk('product/getDataProducts', async (id, { getState }) => {
  const { auth } = getState() as { auth: IInitialStateAuth };
  const response = await requestAuth(
    'get',
    '/products',
    auth.data.result !== null ? auth.data.result.access_token : '',
  );
  return response.data;
});

export const createNewProduct = createAsyncThunk('product/createNewProduct', async (data: any, { getState }) => {
  const { auth } = getState() as { auth: IInitialStateAuth };
  const response = await requestAuth(
    'post',
    '/products',
    auth.data.result !== null ? auth.data.result.access_token : '',
    data,
  );
  return response.data;
});

export const editProduct = createAsyncThunk('product/editProduct', async (data: any, { getState }) => {
  const { auth } = getState() as { auth: IInitialStateAuth };
  const response = await requestAuth(
    'put',
    `/products/${data.id}`,
    auth.data.result !== null ? auth.data.result.access_token : '',
    data,
  );
  return response.data;
});

export const deleteProduct = createAsyncThunk('product/deleteProduct', async (id: number, { getState }) => {
  const { auth } = getState() as { auth: IInitialStateAuth };
  const response = await requestAuth(
    'delete',
    `/products/${id}`,
    auth.data.result !== null ? auth.data.result.access_token : '',
  );
  return response.data;
});

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    saveDataProduct: (state, action: PayloadAction<any>) => {
      state.saveData = action.payload;
    },
  },
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

export const { saveDataProduct } = productSlice.actions;
export default productSlice.reducer;
