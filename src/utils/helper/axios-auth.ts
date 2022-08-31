import axios, { Method, AxiosResponse } from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const MOCK_API_URL = import.meta.env.VITE_MOCK_API_URL;

const api = axios.create({
  baseURL: MOCK_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const requestAuth = <T>(method: Method, url: string, token: string, data?: any): Promise<AxiosResponse<T>> =>
  api.request<T>({
    method,
    url,
    data,
    headers: {
      Authorization: token,
    },
  });

export default requestAuth;
