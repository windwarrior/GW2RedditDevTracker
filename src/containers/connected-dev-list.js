import { connect } from 'react-redux'

import DevList from '../components/devs/dev-list'
import { toggleFilterForDev } from '../actions/actions';

const mapStateToProps = state => {
    return {
        devs: state.devs
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
      toggleFilterForDev: (authorname) => {
        dispatch(toggleFilterForDev(authorname))
      }
    }
  }

const ConnectedDevList = connect(mapStateToProps, mapDispatchToProps)(DevList);

export default ConnectedDevList;