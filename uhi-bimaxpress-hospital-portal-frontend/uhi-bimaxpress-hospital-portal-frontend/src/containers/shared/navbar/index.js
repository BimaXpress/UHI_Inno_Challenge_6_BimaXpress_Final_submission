import { connect } from "react-redux";

import {
  setUserDetailsActivity,
  setSharedLoaderActivity,
  setWalletBalanceActivity,
} from "../../actions";

import Navbar from "./navBar";

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
    setSharedLoaderActivity: (value) => {
      dispatch(setSharedLoaderActivity(value));
    },
    setWalletBalanceActivity: (value) => {
      dispatch(setWalletBalanceActivity(value));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
