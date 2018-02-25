import React from "react";

import { Row, Col, Button } from "reactstrap";

import TextPost from "./posts/text-post";
import ConnectedComment from "../containers/connected-comment";

class ContentList extends React.Component {
    constructor() {
        super();
        this.sensitive = true;
        this.scrollListener = () => this.onScroll();
    }

    render() {
        let content = this.props.contents.map(function(x) {
            let res;

            if (x.type === "comment") {
                res = <ConnectedComment key={x.id} {...x} />;
            } else if (x.type === "text-post") {
                res = <TextPost key={x.id} {...x} />;
            }

            return res;
        });

        return (
            <div>
                <Row>
                    <Col
                        xs="12"
                        md={{ size: 10, offset: 1 }}
                        xl={{ size: 8, offset: 2 }}
                        className="content-container">
                        {content}

                        <Button
                            block
                            href="#"
                            onClick={e => {
                                e.preventDefault();
                                this.props.loadOlder();
                            }}
                            className="my-3">
                            Load Older
                        </Button>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default ContentList;
