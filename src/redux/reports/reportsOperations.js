import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getData = createAsyncThunk(
  'transactions/report',
  async (props, { rejectWithValue, getState }) => {
    const { type, month, year } = props;
    const state = getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return state;
    }
    axios.defaults.headers.common.Authorization = `Bearer ${persistedToken}`;

    try {
      const { data } = await axios.get(
        `api/transactions/report/${type}?month=${month}&year=${year}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getTotalSum = createAsyncThunk(
  'totalSum',
  async (props, { rejectWithValue, getState }) => {
    const { month, year } = props;
    const state = getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return state;
    }
    axios.defaults.headers.common.Authorization = `Bearer ${persistedToken}`;

    try {
      const { data } = await axios.get(
        `api/totalSum/?month=${month}&year=${year}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
