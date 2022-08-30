import axios, { Method, AxiosResponse } from 'axios';

import { useAppSelector } from '@/store/hooks';
import { store } from '@/store/store';

const API_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    // Authorization: `Bearer ${store.getState().auth.token}`,
  },
});

const requestAuth = <T>(method: Method, url: string, data?: any): Promise<AxiosResponse<T>> => {
  api.defaults.headers.common.Authorization = `Bearer `;
  return api.request<T>({
    method,
    url,
    data,
  });
};

export default requestAuth;
