import React from "react";
import { CardTitle } from "reactstrap";

import Moment from "react-moment";

class CommentMeta extends React.Component {
    render() {
        let author_perma = `https://www.reddit.com/u/${this.props.meta.author}`;

        return (
            <CardTitle tag="h6">
                <a href={author_perma}>{this.props.meta.author}</a>
                <span> commented </span>
                <span title={this.props.meta.date}>
                    <Moment fromNow>{this.props.meta.date}</Moment>
                </span>
                {" "}
                <span>
                    (score:
                    {this.props.meta.score > 0
                        ? "+" + this.props.meta.score
                        : this.props.meta.score}){" "}
                </span>
            </CardTitle>
        );
    }
}

export default CommentMeta;
