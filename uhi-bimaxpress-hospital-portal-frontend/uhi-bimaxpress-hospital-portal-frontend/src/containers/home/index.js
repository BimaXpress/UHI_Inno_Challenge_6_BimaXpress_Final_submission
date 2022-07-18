import { connect } from 'react-redux';
import {
  setHospitalSelectedActivity,
  setSharedLoaderActivity,
  setNavbarHeadingActivity,
} from '../actions';
import { setBnplHospitalListActivity } from './actions';
import Home from './home';

const mapStateToProps = (state) => {
  return {
    state: Object.assign({}, state.Home, state.Shared),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
