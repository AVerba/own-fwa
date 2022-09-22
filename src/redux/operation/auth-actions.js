import { createAction } from '@reduxjs/toolkit';

const actions = {
  refreshSessionRequest: createAction('operation/refreshSessionRequest'),
  refreshSessionSuccess: createAction('operation/refreshSessionSuccess'),
  refreshSessionError: createAction('operation/refreshSessionError'),

  getCurrentUserRequest: createAction('operation/getCurrentUserRequest'),
  getCurrentUserSuccess: createAction('operation/getCurrentUserSuccess'),
  getCurrentUserError: createAction('operation/getCurrentUserError'),
};

export default actions;
