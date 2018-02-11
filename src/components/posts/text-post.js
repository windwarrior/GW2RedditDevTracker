import React from 'react';

import PostMeta from '../posts/post-meta';

import Markdown from '../markdown';

import { Card, CardBody, CardText, Row, Col, CardHeader } from 'reactstrap';

class TextPost extends React.Component {
    render() {
        return (
            <Row>
                <Col xs="12" md={{ size: 10, offset: 1}} xl={{ size: 8, offset: 2 }} className="content-container">
                    <Card outline className="mt-3">
                        <CardHeader className="anet-post">
                            Post by ArenaNet
                        </CardHeader>
                        <CardHeader>
                            <PostMeta meta={this.props.meta} />
                        </CardHeader>

                        <CardBody>
                            <CardText tag="div">
                                <Markdown markdown={this.props.body} />
                            </CardText>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        )

    }
}

export default TextPost;