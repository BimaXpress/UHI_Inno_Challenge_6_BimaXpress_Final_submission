import * as t from './actionTypes';
import api from '../../utils/api';

export const setBnplHospitalList = (data) => ({
  type: t.SETBNPLHOSPITALLIST,
  data,
});
export const setBnplHospitalListActivity =
  (value) => async (dispatch, getState) => {
    dispatch(setBnplHospitalList(value));
  };
