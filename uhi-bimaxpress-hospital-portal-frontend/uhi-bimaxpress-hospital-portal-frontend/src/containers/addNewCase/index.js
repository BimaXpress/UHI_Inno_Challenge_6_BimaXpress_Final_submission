import { connect } from 'react-redux';
import { setMessageActivity } from './actions';
import { setSharedLoaderActivity } from '../actions';

import AddNewCase from './addNewCase';

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
    setMessageActivity: (value) => {
      dispatch(setMessageActivity(value));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddNewCase);
