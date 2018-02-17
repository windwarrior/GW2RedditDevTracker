import React from 'react';
import { CardLink } from 'reactstrap';

class CommentLinks extends React.Component {
    
    render() {
        let absolute_link = `https://www.reddit.com${this.props.perma}`;
        let context_link = `${absolute_link}?context=3`;

        return (
            <div>
                <CardLink href={absolute_link}>
                    Permalink
                </CardLink>

                <CardLink href={context_link}>
                    Context
                </CardLink>

                <CardLink href="#" onClick={() => this.props.onAuthorFilter(this.props.author)}>
                    Filter {this.props.author}
                </CardLink>
            </div>
        )
    }
}

export default CommentLinks;