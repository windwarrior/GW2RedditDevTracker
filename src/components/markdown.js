import React from 'react';
import SnuOwnd from 'snuownd';

class Markdown extends React.Component {
    render () {
        let obj = {
            __html: SnuOwnd.getParser().render(this.props.markdown)
        }

        return <div dangerouslySetInnerHTML={obj} />;
    }
}

export default Markdown;