import React from 'react';

import TextPost from './posts/text-post';
import ConnectedComment from '../containers/connected-comment';
import Spinner from '../components/spinner';

class ContentList extends React.Component {
    constructor () {
        super();
        this.sensitive = true;
    }

    componentDidMount() {        
        window.addEventListener('scroll', () => this.onScroll());
    }

    componentDidUpdate() {
        this.sensitive = true;
    }

    onScroll() {
        if (this.sensitive && window.scrollY > 0.8 * document.documentElement.scrollHeight) {
            console.log(window.scrollY, document.documentElement.scrollHeight);
            this.sensitive = false;
            this.props.loadOlder();
        }
    }

    render() {

        let content = this.props.contents.map(function (x) {
            let res;

            if (x.type === "comment") {
                res = <ConnectedComment
                    key={x.id}
                    {...x}
                />
            } else if (x.type === "text-post") {
                res = <TextPost
                    key={x.id}
                    {...x}
                />
            }

            return res;
        }
        )

        return (
            <div>
                {content}

                <Spinner/>
            </div>
        );

    }
}

export default ContentList;