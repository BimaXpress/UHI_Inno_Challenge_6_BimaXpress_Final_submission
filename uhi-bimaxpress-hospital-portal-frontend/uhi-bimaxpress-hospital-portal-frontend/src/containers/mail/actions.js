import * as t from './actionTypes';
import api from '../../utils/api';
import { setLoaderActivity } from '../actions';

export const setSelectedMessage = (data) => ({
  type: t.SELECTEDSETMESSEGE,
  data,
});

export const setSelectedMessageActivity =
  (value) => async (dispatch, getState) => {
    dispatch(setSelectedMessage(value));
  };
