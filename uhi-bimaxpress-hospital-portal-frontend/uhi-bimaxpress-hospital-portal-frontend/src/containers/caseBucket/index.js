import { connect } from 'react-redux';
import { setSharedLoaderActivity, setNavbarHeadingActivity } from '../actions';
import { setBucketDataActivity } from './actions';

import CaseBucket from './caseBucket';

const mapStateToProps = (state) => {
  return {
    state: Object.assign({}, state.CaseBucket, state.Shared),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setBucketDataActivity: (value) => {
      dispatch(setBucketDataActivity(value));
    },

    setSharedLoaderActivity: (value) => {
      dispatch(setSharedLoaderActivity(value));
    },

    setNavbarHeadingActivity: (value) => {
      dispatch(setNavbarHeadingActivity(value));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CaseBucket);
