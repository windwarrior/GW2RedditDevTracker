import React from 'react';


import { Card,  CardBody, CardText, Row, Col, CardHeader } from 'reactstrap';

import FilterList from '../filter/filter-list';
import ToggleList from './toggle-list';

class Settings extends React.Component {
    render() {
        return (
            <Row>
                <Col xs="12" md={{ size: 10, offset: 1}} xl={{ size: 8, offset: 2 }} className="content-container">
                    <Card className="my-3">                
                        <CardHeader> 
                            Toggles
                        </CardHeader>
                        <CardBody>
                            <CardText>
                                <ToggleList toggles={this.props.toggles} flipToggle={this.props.flipToggle} />
                            </CardText>
                        </CardBody>
                    </Card>

                    <Card className="my-3">                
                        <CardHeader> 
                            Filters
                        </CardHeader>
                        <CardBody>
                            <CardText>
                                <p> <em> Posts or comments by developers that are filtered will not be shown in the dev tracker </em> </p>
                                <FilterList entries={this.props.entries} toggleFilterForEntry={this.props.toggleFilterForEntry}/>
                            </CardText>
                        </CardBody>
                    </Card>                
                </Col>
            </Row>
        )

    }
}

export default Settings;