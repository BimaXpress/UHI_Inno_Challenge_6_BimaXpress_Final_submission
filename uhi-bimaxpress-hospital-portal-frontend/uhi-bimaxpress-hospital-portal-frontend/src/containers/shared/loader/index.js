import { connect } from 'react-redux';

import { setCounterActivity } from '../../actions';

import Loader from './loader';

const mapStateToProps = (state) => {
  return {
    state: Object.assign({}, state.Shared),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCounterActivity: (value) => {
      dispatch(setCounterActivity(value));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
