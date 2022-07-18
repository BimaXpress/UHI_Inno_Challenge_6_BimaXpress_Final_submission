import { connect } from 'react-redux';
import { setSharedLoaderActivity } from '../actions';
import { setMessageActivity } from './actions';

import EmpanelledCompanies from './empanelledCompanies';

const mapStateToProps = (state) => {
  return {
    state: Object.assign({}, state.Home, state.Shared),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSharedLoaderActivity: (value) => {
      dispatch(setSharedLoaderActivity(value));
    },

    setMessageActivity: (value) => {
      dispatch(setMessageActivity(value));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmpanelledCompanies);
