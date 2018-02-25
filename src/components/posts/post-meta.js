import React from "react";
import { CardTitle } from "reactstrap";

class PostMeta extends React.Component {
    /*
        Initialized with object consisting of: 
            * title
            * date
            * subreddit
            * perma
            * author
    */

    render() {
        let author_perma = `https://www.reddit.com/u/${this.props.meta.author}`;

        return (
            <CardTitle>
                <a href={this.props.meta.perma}>{this.props.meta.title}</a>{" "}
                <small>
                    by <a href={author_perma}>{this.props.meta.author}</a> in{" "}
                    {this.props.meta.subreddit}
                </small>
            </CardTitle>
        );
    }
}

export default PostMeta;
