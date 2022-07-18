import * as t from "./actionTypes";
import { initialState } from "./initialstate";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case t.SETCOUNTER:
      return Object.assign({}, state, {
        counter: action.data,
      });
    case t.SETUSERDETAILS:
      return Object.assign({}, state, {
        userDetails: action.data,
      });
    case t.SETLOADER:
      return Object.assign({}, state, {
        loader: action.data,
      });

    case t.SETNAVBARHEADING:
      return Object.assign({}, state, {
        navbarHeading: action.data,
      });

    case t.SETHOSPITALSELECTED:
      return Object.assign({}, state, {
        hospitalSelected: action.data,
      });

    case t.SHAREDLOADER:
      return Object.assign({}, state, {
        sharedLoader: action.data,
      });

    case t.SETWALLETBALANCE:
      return Object.assign({}, state, {
        walletBalance: action.data,
      });
    default:
      return state;
  }
};
