import React from 'react';

import Toggle from './toggle';

class ToggleList extends React.Component {
    render() {
        return (
            <div> 
                {this.props.toggles.map(x => 
                    <Toggle {...x} flipToggle={this.props.flipToggle}/>
                )}
            </div>
        )        
    }
}

export default ToggleList;