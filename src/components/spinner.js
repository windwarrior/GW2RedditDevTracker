import React from 'react';

import '../Spinner.css';

class Spinner extends React.Component {
    constructor () {
        super();
    }

    render() {
        return (
            <div id="spinner-container">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        )        
    }
}

export default Spinner;