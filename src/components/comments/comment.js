import React from 'react';

import PostMeta from '../posts/post-meta';
import CommentMeta from './comment-meta';
import CommentLinks from './comment-links';
import Parent from './parent';

import Markdown from '../markdown';

import { Card, CardBody, CardText, Row, Col, CardHeader } from 'reactstrap';
import Spinner from '../spinner';

class Comment extends React.Component {
    render() {
        let parent = null;

        if (this.props.parent_content.last_updated != null) {
            parent = 
                <details>
                    <summary> Show Parent</summary>
                    <Parent parent_content={this.props.parent_content}/>
                </details>
        } else {
            parent = 
                <details onClick={e => this.props.onParentOpen(this.props.id, this.props.parent_content.id)}>
                    <summary> Show Parent </summary>
                    <Spinner/>
                </details>
        }

        return (
            <Row>
                <Col xs="12" md={{ size: 10, offset: 1}} xl={{ size: 8, offset: 2 }} className="content-container">
                    <Card className="mt-3">
                        <CardHeader>
                            <PostMeta meta={this.props.post_meta} />
                        </CardHeader>
                        <CardHeader>
                            {parent}                            
                        </CardHeader>
                        <CardBody>
                            <CardText tag="div">
                                <CommentMeta meta={this.props.meta} />
                                <Markdown markdown={this.props.body} />
                            </CardText>

                            <CommentLinks perma={this.props.meta.perma} author={this.props.meta.author} onAuthorFilter={this.props.onAuthorFilter} />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        )

    }
}

export default Comment;