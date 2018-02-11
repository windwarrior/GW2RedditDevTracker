import { connect } from 'react-redux'

import DevList from '../components/devs/dev-list'

const mapStateToProps = state => {
    return {
        devs: state.devs
    }
}

const ConnectedDevList = connect(mapStateToProps)(DevList);

export default ConnectedDevList;