import {createAsyncThunk} from '@reduxjs/toolkit';

import {isAxiosError} from 'axios';
import axiosApi from '../../axiosApi.ts';

import { GlobalError, LoginUser, RegisterUser, RegistrationResponse, ValidationError } from '../../types';
// import { RootState } from '../../app/store.ts';
import { unsetUser } from './usersSlice.ts';

export const registration = createAsyncThunk<RegistrationResponse, RegisterUser, {
  rejectValue: ValidationError
}>(
  'users/registered',
  async (registrationUser, {rejectWithValue}) => {
    try {

      const response = await axiosApi.post('/users', registrationUser);
      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 422) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  }
);

export const login = createAsyncThunk<RegistrationResponse, LoginUser, { rejectValue: GlobalError }>(
  'users/login',
  async (loginUser, {rejectWithValue}) => {
    try {
      const response = await axiosApi.post('/users/sessions', loginUser);
      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 422) {
        return rejectWithValue(e.response.data);
      }

      throw e;
    }
  }
);

export const logout = createAsyncThunk<void, undefined>(
  'users/logout',
  async (_, {dispatch}) => {
    // const token = getState().users.users?.token;
    await axiosApi.delete('/users/sessions');
    dispatch(unsetUser());
  }
);