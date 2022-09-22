import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

axios.defaults.baseURL = 'https://finance-wallet.herokuapp.com';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

const register = createAsyncThunk('operation/register', async credentials => {
  try {
    const { data } = await axios.post('/api/auth/register', credentials);
    return data;
  } catch (error) {
    error?.response?.data?.email === 'MongoError' &&
      Notify.failure(`User already exists.`);
  }
});
const logIn = createAsyncThunk('operation/login', async credentials => {
  try {
    const { data } = await axios.post('/api/auth/login', credentials);
    data.user &&
      Notify.success(
        `Welcome back, ${
          data.user.email.split('@')[0]
        }! You are successfully Signed in.`,
        { position: 'right' }
      );
    token.set(data.token);
    return data;
  } catch (error) {
    error?.response?.data &&
      Notify.failure(`Невірний логін або пароль, повторіть спробу`);
  }
});

const loginWithGoogle = createAsyncThunk(
  'operation/login',
  async googleToken => {
    token.set(googleToken);
    try {
      const { data } = await axios.get('/api/auth/current');

      return data;
    } catch (error) {
      error?.response?.data &&
        Notify.failure(`wrong login or password, try again`);
    }
  }
);

const logOut = createAsyncThunk('operation/logout', async () => {
  try {
    await axios.get('/api/auth/logout');
    token.unset();
  } catch (error) {
    Notify.failure(`${error.message}`);
  }
});

const fetchCurrentUser = createAsyncThunk(
  'operation/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return state;
    }

    token.set(persistedToken);
    try {
      const { data } = await axios.get('/api/auth/current');

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

//===================================================

const setBalance = createAsyncThunk('operation/balance', async balance => {
  try {
    const { data } = await axios.patch('/api/auth/balance', balance);
    return data;
  } catch (error) {
    Notify.failure(`${error.message}`);
  }
});

const addTransaction = createAsyncThunk(
  'transactions',
  async ({ transaction, type }) => {
    try {
      const { data } = await axios.post(
        `api/transactions/${type}`,
        transaction
      );
      return data;
    } catch (error) {
      Notify.failure(`${error.message}`);
    }
  }
);

const deleteTransaction = createAsyncThunk('transactions', async ({ id }) => {
  try {
    const { data } = await axios.delete(`api/transactions/${id}`);
    return data;
  } catch (error) {
    Notify.failure(`${error.message}`);
  }
});
const getTransactionListByType = createAsyncThunk(
  'transactions/listByType',
  async ({ type, day, month, year }) => {
    try {
      const { data } = await axios.get(
        `api/transactions/${type}?day=${day}&month=${month}&year=${year}`
      );

      return data;
    } catch (error) {}
  }
);
const getTransactionsByMonth = createAsyncThunk(
  'transactions/ByMonth',
  async ({ type }) => {
    try {
      const { data } = await axios.get(`api/transactions/summary/${type}`);
      return data;
    } catch (error) {
      Notify.failure(`${error.message}`);
    }
  }
);
const getAllTransactions = createAsyncThunk(
  'transactions/all',
  async ({ day, month, year }) => {
    try {
      const { data } = await axios.get(
        `api/transactions/?day=${day}&month=${month}&year=${year}`
      );

      return data;
    } catch (error) {}
  }
);

//=============================================

const operations = {
  register,
  logOut,
  logIn,
  fetchCurrentUser,
  loginWithGoogle,

  setBalance,
  addTransaction,
  deleteTransaction,
  getTransactionListByType,
  getTransactionsByMonth,
  getAllTransactions,
};
export default operations;
