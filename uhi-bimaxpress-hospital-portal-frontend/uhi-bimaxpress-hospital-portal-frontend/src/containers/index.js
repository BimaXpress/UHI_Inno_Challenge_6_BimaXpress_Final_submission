import { connect } from 'react-redux';
import {
  setCounterActivity,
  setUserDetailsActivity,
  setLoaderActivity,
  setNavbarHeadingActivity,
  setHospitalSelectedActivity,
  setSharedLoaderActivity,
} from './actions';

const mapStateToProps = (state) => {
  return {
    state: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCounterActivity: (value) => {
      dispatch(setCounterActivity(value));
    },

    setUserDetailsActivity: (value) => {
      dispatch(setUserDetailsActivity(value));
    },

    setLoaderActivity: (value) => {
      dispatch(setLoaderActivity(value));
    },

    setNavbarHeadingActivity: (value) => {
      dispatch(setNavbarHeadingActivity(value));
    },

    setHospitalSelectedActivity: (value) => {
      dispatch(setHospitalSelectedActivity(value));
    },

    setSharedLoaderActivity: (value) => {
      dispatch(setSharedLoaderActivity(value));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps);
