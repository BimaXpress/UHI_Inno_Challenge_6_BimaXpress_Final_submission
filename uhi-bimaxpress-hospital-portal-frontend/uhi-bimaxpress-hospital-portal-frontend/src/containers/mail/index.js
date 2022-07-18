import { connect } from 'react-redux';
import { setSelectedMessageActivity } from './actions';
import { setSharedLoaderActivity } from '../actions';

import Mail from './mail';

const mapStateToProps = (state) => {
  return {
    state: Object.assign({}, state.Mail, state.Shared),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedMessageActivity: (value) => {
      dispatch(setSelectedMessageActivity(value));
    },

    setSharedLoaderActivity: (value) => {
      dispatch(setSharedLoaderActivity(value));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Mail);
