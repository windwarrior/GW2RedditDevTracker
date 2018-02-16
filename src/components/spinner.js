import React from 'react';

import '../Spinner.css';

class Spinner extends React.Component {
    constructor () {
        super();
    }

    render() {
        return (
            <div class="spinner-container">
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