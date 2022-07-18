import * as t from "./actionTypes";
export const setCounter = (data) => ({
  type: t.SETCOUNTER,
  data,
});

export const setUserDetails = (data) => ({
  type: t.SETUSERDETAILS,
  data,
});

export const setLoader = (data) => ({
  type: t.SETLOADER,
  data,
});

export const setNavbarHeading = (data) => ({
  type: t.SETNAVBARHEADING,
  data,
});

export const setHospitalSelected = (data) => ({
  type: t.SETHOSPITALSELECTED,
  data,
});

export const setWalletBalance = (data) => ({
  type: t.SETWALLETBALANCE,
  data,
});

export const setNavbarHeadingActivity =
  (value) => async (dispatch, getState) => {
    dispatch(setNavbarHeading(value));
  };

export const setCounterActivity = (value) => async (dispatch, getState) => {
  dispatch(setCounter(value));
};

export const setUserDetailsActivity = (value) => async (dispatch, getState) => {
  dispatch(setUserDetails(value));
};

export const setWalletBalanceActivity =
  (value) => async (dispatch, getState) => {
    dispatch(setWalletBalance(value));
  };

export const setLoaderActivity = (value) => async (dispatch, getState) => {
  dispatch(setLoader(value));
};

export const setHospitalSelectedActivity =
  (value) => async (dispatch, getState) => {
    dispatch(setHospitalSelected(value));
  };

export const sharedLoader = (data) => ({
  type: t.SHAREDLOADER,
  data,
});
export const setSharedLoaderActivity =
  (value) => async (dispatch, getState) => {
    dispatch(sharedLoader(value));
  };
