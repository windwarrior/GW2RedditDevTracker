import React from 'react';

import { Button } from 'reactstrap';

class Toggle extends React.Component {
    render() {
        return (
            <div> 
                {this.props.name}        
                <Button className="float-right" color={ this.props.state ? "danger" : "success" } onClick={() => this.props.flipToggle(this.props.name)}>{ this.props.state ? "Disable" : "Enable" }</Button>
            </div>
        )        
    }
}

export default Toggle;