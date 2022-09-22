import { createSlice } from '@reduxjs/toolkit';
import { getData, getTotalSum } from './reportsOperations';

const initialState = {
  transactions: [],
  totalSum: [],
  type: 'expense',
  date: {},
  isLoading: false,
  error: null,
};

export const reportsSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    updateType(state, { payload }) {
      state.type = payload;
    },
    updateDate(state, { payload }) {
      state.date = { ...payload };
    },
  },
  extraReducers: {
    [getData.fulfilled]: (state, { payload }) => {
      state.transactions = payload.transactions;
      state.isLoading = false;
      state.error = null;
    },
    [getData.pending]: state => {
      state.isLoading = true;
      state.error = null;
    },
    [getData.rejected]: (state, { payload }) => {
      state.transactions = [];
      state.isLoading = false;
      state.error = payload;
    },

    [getTotalSum.fulfilled]: (state, { payload }) => {
      state.totalSum = payload.data;
      state.error = null;
    },
    [getTotalSum.pending]: state => {
      state.error = null;
    },
    [getTotalSum.rejected]: (state, { payload }) => {
      state.error = payload;
    },
  },
});

export const { updateType, updateDate } = reportsSlice.actions;
