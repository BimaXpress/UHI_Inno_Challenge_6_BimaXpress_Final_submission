import { connect } from 'react-redux';
import { setMessageActivity } from './actions';

import orderDetails from './orderDetails';

const mapStateToProps = (state) => {
  return {
    state: Object.assign({}, state.Home, state.Shared),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setMessageActivity: (value) => {
      dispatch(setMessageActivity(value));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(orderDetails);
