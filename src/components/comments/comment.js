import React from "react";

import PostMeta from "../posts/post-meta";
import CommentMeta from "./comment-meta";
import CommentLinks from "./comment-links";
import Parent from "./parent";

import Markdown from "../markdown";

import { Card, CardBody, CardText, CardHeader } from "reactstrap";
import Spinner from "../spinner";

class Comment extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        let parent = null;

        if (this.props.parent_content.last_updated != null) {
            parent = (
                <div>
                    <div
                        class={"summary" + (this.state.isOpen ? " open" : "")}
                        onClick={e => this.toggle()}>
                        Parent
                    </div>
                    {this.state.isOpen ? (
                        <div>
                            <Parent parent_content={this.props.parent_content} />
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            );
        } else {
            parent = (
                <div>
                    <div
                        class={"summary" + (this.state.isOpen ? " open" : "")}
                        onClick={e => {
                            this.toggle();
                            this.props.onParentOpen(this.props.id, this.props.parent_content.id);
                        }}>
                        Parent
                    </div>
                    {this.state.isOpen ? (
                        <div>
                            <Spinner />
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            );
        }

        return (
            <Card className="mt-3">
                <CardHeader>
                    <PostMeta meta={this.props.post_meta} />
                </CardHeader>
                <CardHeader>{parent}</CardHeader>
                <CardBody>
                    <CardText tag="div">
                        <CommentMeta meta={this.props.meta} />
                        <Markdown markdown={this.props.body} />
                    </CardText>

                    <CommentLinks
                        perma={this.props.meta.perma}
                        author={this.props.meta.author}
                        onAuthorFilter={this.props.onAuthorFilter}
                    />
                </CardBody>
            </Card>
        );
    }
}

export default Comment;
