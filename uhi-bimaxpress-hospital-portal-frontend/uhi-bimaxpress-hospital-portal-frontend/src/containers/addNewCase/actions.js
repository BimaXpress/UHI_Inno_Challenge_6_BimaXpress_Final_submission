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

export const fetchPolicies = (filter) => async (dispatch) => {
  // dispatch(setLoaderActivity(true));
  let data = {
    email: 'bnpl@gmail.com',
    password: '123456',
  };
  try {
    //Change the below code as per API
    let policies = await api.auth.assign(data);
    //Change the below code on API integration (remove dispatch from setTimeout)
    // dispatch(setMessage(policies));
    // dispatch(setLoaderActivity(false));
    console.log('user data', policies.json);
    setMessage(policies.json);
  } catch (e) {
    // dispatch(setLoaderActivity(false));
    console.log(e.message);
  }
};
