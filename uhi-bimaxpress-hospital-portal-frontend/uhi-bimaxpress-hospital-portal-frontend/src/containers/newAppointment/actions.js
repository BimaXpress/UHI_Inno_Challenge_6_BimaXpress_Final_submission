import * as t from './actionTypes';
import api from '../../utils/api';
import { setLoaderActivity } from '../actions';

export const setMessage = (data) => ({
  type: t.SETMESSEGE,
  data,
});

export const setMessageActivity = (value) => async (dispatch, getState) => {
  dispatch(setMessage(value));
};
