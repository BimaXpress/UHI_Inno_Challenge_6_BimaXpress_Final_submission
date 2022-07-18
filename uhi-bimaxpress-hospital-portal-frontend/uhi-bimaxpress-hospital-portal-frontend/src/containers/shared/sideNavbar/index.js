import { connect } from 'react-redux';
import { setNavbarHeadingActivity } from '../../actions';

import Navbar from './sideNavbar';

const mapStateToProps = (state) => {
  return {
    state: Object.assign({}, state.Shared),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setNavbarHeadingActivity: (value) => {
      dispatch(setNavbarHeadingActivity(value));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
