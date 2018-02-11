import React from 'react';
import { ListGroup } from 'reactstrap';

import Dev from './dev';

class DevList extends React.Component {
    /*
        Initialized with object consisting of:
            * (comment) author
            * date
            * score
            * perma
    */

    render() {
        return (
            <ListGroup className="py-3">
                {this.props.devs.map(dev => (
                    <Dev key={dev.name} dev={dev}/> 
                ))}
            </ListGroup>
        )
    }
}

export default DevList;