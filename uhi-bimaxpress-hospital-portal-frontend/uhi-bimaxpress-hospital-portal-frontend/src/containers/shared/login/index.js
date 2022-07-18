import { connect } from 'react-redux';
import { setUserDetailsActivity, setSharedLoaderActivity } from '../../actions';
import Login from './login';

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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
