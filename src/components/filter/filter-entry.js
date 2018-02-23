import React from 'react';
import { ListGroupItem, Button } from 'reactstrap';

class FilterEntry extends React.Component {
    /*
        Initialized with object consisting of
            * name
            * hidden
    */

    render() {
        return (
            <ListGroupItem>
                {this.props.entry.name}
                <Button className="float-right" color={ this.props.entry.hidden ? "success" : "danger" } onClick={() => this.props.toggleFilterForEntry(this.props.entry.name)}>{ this.props.entry.hidden ? "Track" : "Filter" }</Button>
            </ListGroupItem>
        )
    }
}

export default FilterEntry;