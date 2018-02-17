import React from 'react';
import { ListGroupItem, Button } from 'reactstrap';

class Dev extends React.Component {
    /*
        Initialized with object consisting of
            * name
            * hidden
    */

    render() {
        return (
            <ListGroupItem>
                {this.props.dev.name} 
                {this.props.dev.hidden
                    ? <Button className="float-right" color="success" onClick={() => this.props.toggleFilterForDev(this.props.dev.name)}>Track</Button> 
                    : <Button className="float-right" color="danger" onClick={() => this.props.toggleFilterForDev(this.props.dev.name)}>Filter</Button> 
                }
            </ListGroupItem>
        )
    }
}

export default Dev;