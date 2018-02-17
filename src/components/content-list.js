import React from 'react';

import TextPost from './posts/text-post';
import ConnectedComment from '../containers/connected-comment';

import { Row, Col, Button } from 'reactstrap';

class ContentList extends React.Component {
    constructor() {
        super();
        this.sensitive = true;
        this.scrollListener = () => this.onScroll();
    }

    // componentDidMount() {
    //     window.addEventListener('scroll', this.scrollListener);
    //     this.sensitive = true;
    // }

    // componentDidUpdate() {
    //     this.sensitive = true;
    // }

    // componentWillUnmount() {
    //     window.removeEventListener('scroll', this.scrollListener);
    //     this.sensitive = false;
    // }

    // onScroll() {
    //     if (this.sensitive && window.scrollY > 0.8 * document.documentElement.scrollHeight) {
    //         this.sensitive = false;
    //         this.props.loadOlder();
    //     }
    // }

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
                <Row>
                    <Col xs="12" md={{ size: 10, offset: 1}} xl={{ size: 8, offset: 2 }}> 
                        <Button block href="#" onClick={(e) => {e.preventDefault(); this.props.loadOlder()}} className="my-3"> Load Older </Button>
                    </Col>
                </Row>
            </div>
        );

    }
}

export default ContentList;