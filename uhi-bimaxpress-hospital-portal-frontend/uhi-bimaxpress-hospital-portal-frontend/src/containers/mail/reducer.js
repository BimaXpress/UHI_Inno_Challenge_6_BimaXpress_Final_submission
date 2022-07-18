import * as t from './actionTypes';
import { initialState } from './initialstate';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case t.SELECTEDSETMESSEGE:
      return Object.assign({}, state, {
        selectedMessage: action.data,
      });
    default:
      return state;
  }
};
