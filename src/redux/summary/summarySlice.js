import authOperation from '../operation/authOperations';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  summaryList: null,
};

const summarySlice = createSlice({
  name: 'summary',
  initialState,

  extraReducers: {
    [authOperation.getTransactionsByMonth.fulfilled](state, action) {
      state.SummaryList = [...action.payload.data.result];
    },
    [authOperation.getTransactionsByMonth.rejected](state, _) {
      state.SummaryList = [];
    },
  },
});
export default summarySlice.reducer;
