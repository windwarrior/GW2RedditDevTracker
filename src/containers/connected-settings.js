import { connect } from "react-redux";

import Settings from "../components/settings/settings";

import { toggleFilterForDev, flipToggle } from "../actions/actions";

const mapStateToProps = state => {
    return {
        entries: state.devs,
        toggles: state.toggles
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        toggleFilterForEntry: entryName => {
            dispatch(toggleFilterForDev(entryName));
        },
        flipToggle: toggle => {
            dispatch(flipToggle(toggle));
        }
    };
};

const ConnectedSettings = connect(mapStateToProps, mapDispatchToProps)(Settings);

export default ConnectedSettings;
