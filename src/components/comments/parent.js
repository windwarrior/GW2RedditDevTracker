import React from "react";

import { CardText } from "reactstrap";

import CommentLinks from "./comment-links";
import CommentMeta from "./comment-meta";
import Markdown from "../markdown";

class Parent extends React.Component {
    render() {
        let parent;

        if (this.props.parent_content.type === "comment") {
            parent = (
                <div>
                    <CardText tag="div">
                        <CommentMeta meta={this.props.parent_content.meta} />
                        <Markdown markdown={this.props.parent_content.body} />
                    </CardText>

                    <CommentLinks perma={this.props.parent_content.meta.perma} />
                </div>
            );
        } else if (this.props.parent_content.type === "text-post") {
            parent = (
                <div>
                    <CardText tag="div">
                        <Markdown markdown={this.props.parent_content.body} />
                    </CardText>
                </div>
            );
        }

        return parent;
    }
}

export default Parent;
