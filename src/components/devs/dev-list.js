import React from 'react';
import { ListGroup, Row, Col } from 'reactstrap';

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
        let filtered_devs = this.props.devs.filter(x => x.hidden);
        let tracked_devs = this.props.devs.filter(x => !x.hidden);


        return (

            <Row>
                <Col xs="12" md={{ size: 10, offset: 1 }} xl={{ size: 8, offset: 2 }}>
                
                    <h3> Filtered Devs </h3>
                    <p> Comments or posts by these developers will not appear in the dev tracker. </p>
                    {
                        filtered_devs.length > 0 ?
                            (
                                <ListGroup className="py-3">
                                    {filtered_devs.map(dev => (
                                        <Dev key={dev.name} dev={dev} toggleFilterForDev={this.props.toggleFilterForDev} />
                                    ))}
                                </ListGroup>
                            ) : <p> <em> No devs have been filtered </em> </p>
                    }

                    <h3> Tracked Devs </h3>
                    <p> Comments or posts by these developers will appear in the dev tracker. </p>
                    {
                        tracked_devs.length > 0 ?
                            (
                                <ListGroup className="py-3">
                                    {tracked_devs.map(dev => (
                                        <Dev key={dev.name} dev={dev} toggleFilterForDev={this.props.toggleFilterForDev} />
                                    ))}
                                </ListGroup>
                            ) : <p> <em> No devs are being tracked, the dev tracker will appear empty! </em> </p>
                    }
                </Col>
            </Row>

        )
    }
}

export default DevList;