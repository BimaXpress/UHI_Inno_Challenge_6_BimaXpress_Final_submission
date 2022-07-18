import { connect } from 'react-redux';
import { setMessageActivity } from './actions';
import { setSharedLoaderActivity, setNavbarHeadingActivity } from '../actions';

import NewAppointment from './newAppointment';

const mapStateToProps = (state) => {
  return {
    state: Object.assign({}, state.Shared),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSharedLoaderActivity: (value) => {
      dispatch(setSharedLoaderActivity(value));
    },

    setNavbarHeadingActivity: (value) => {
      dispatch(setNavbarHeadingActivity(value));
    },

    setMessageActivity: (value) => {
      dispatch(setMessageActivity(value));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewAppointment);
