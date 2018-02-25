import React from "react";

import PostMeta from "../posts/post-meta";

import Markdown from "../markdown";

import { Card, CardBody, CardText, CardHeader } from "reactstrap";

class TextPost extends React.Component {
    render() {
        return (
            <Card outline className="mt-3">
                <CardHeader className="anet-post">Post by ArenaNet</CardHeader>
                <CardHeader>
                    <PostMeta meta={this.props.meta} />
                </CardHeader>

                <CardBody>
                    <CardText tag="div">
                        <Markdown markdown={this.props.body} />
                    </CardText>
                </CardBody>
            </Card>
        );
    }
}

export default TextPost;
