import React from "react";
import { CardLink } from "reactstrap";

class CommentLinks extends React.Component {
    render() {
        let absolute_link = `https://www.reddit.com${this.props.perma}`;
        let context_link = `${absolute_link}?context=3`;

        let filter_link = "";

        if (this.props.onAuthorFilter) {
            filter_link = (
                <CardLink href="#" onClick={() => this.props.onAuthorFilter(this.props.author)}>
                    Filter {this.props.author}
                </CardLink>
            );
        }

        return (
            <div>
                <CardLink href={absolute_link}>Permalink</CardLink>

                <CardLink href={context_link}>Context</CardLink>

                {filter_link}
            </div>
        );
    }
}

export default CommentLinks;
