import { ADD_ACTION } from './actiontypeH';

export const addAction = (action) => ({
  type: ADD_ACTION,
  payload: action,
});
