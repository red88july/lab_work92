import axios from 'axios';
import { RootState } from './app/store.ts';
import { Store } from '@reduxjs/toolkit';

const axiosApi = axios.create({
  baseURL: 'http://localhost:8000',
});

export const addInterceptors = (store: Store<RootState>) => {
  const token = store.getState().users.users?.token;
  axiosApi.interceptors.request.use((config ) => {
    config.headers.set('Authorization', token ? 'Bearer ' + token : undefined);
    return config;
  });
};

export default axiosApi;