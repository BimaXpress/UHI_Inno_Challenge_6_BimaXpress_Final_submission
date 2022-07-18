import * as t from './actionTypes';
import api from '../../utils/api';

export const setBucketData = (data) => ({
  type: t.SETBUCKETDATA,
  data,
});
export const setBucketDataActivity = (value) => async (dispatch, getState) => {
  dispatch(setBucketData(value));
};
