import { ADD_ACTION } from './actiontypeH';

const initialState = {
  actionLog: [],
};

export const actionreducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ACTION:
      return {
        ...state,
        actionLog: [...state.actionLog, action.payload],
      };
    default:
      return state;
  }
};


