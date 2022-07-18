import { connect } from "react-redux";

import {
  setUserDetailsActivity,
  setLoaderActivity,
  setSharedLoaderActivity,
  setWalletBalanceActivity,
} from "../actions";

import { AuthProvider } from "./context";

const mapStateToProps = (state) => {
  return {
    state: Object.assign({}, state.Shared),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUserDetailsActivity: (value) => {
      dispatch(setUserDetailsActivity(value));
    },
    setLoaderActivity: (value) => {
      dispatch(setLoaderActivity(value));
    },
    setSharedLoaderActivity: (value) => {
      dispatch(setSharedLoaderActivity(value));
    },
    setWalletBalanceActivity: (value) => {
      dispatch(setWalletBalanceActivity(value));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthProvider);
