import { Component } from "react";
import { connect } from "react-redux";

class DarkMode extends Component {
    componentDidMount() {
        document.body.classList.toggle("dark-mode", this.props.darkMode);
    }

    componentWillReceiveProps(nextProps) {
        document.body.classList.toggle("dark-mode", nextProps.darkMode);
    }

    componentWillUnmount() {
        document.body.classList.remove("darkClass");
    }

    render() {
        return this.props.children;
    }
}

const mapStateToProps = state => {
    return {
        darkMode: state.toggles.find(x => x.name === "Dark Mode").state
    };
};

const DarkModeContainer = connect(mapStateToProps)(DarkMode);

export default DarkModeContainer;
