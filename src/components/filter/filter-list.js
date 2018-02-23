import React from 'react';
import { ListGroup } from 'reactstrap';

import FilterEntry from './filter-entry';

class FilterList extends React.Component {
    render() {
        let filtered = this.props.entries.filter(x => x.hidden);
        let tracked = this.props.entries.filter(x => !x.hidden);

        return (
            <div>             
                <h6> Filtered </h6>
                {
                    filtered.length > 0 ?
                        (
                            <ListGroup className="py-3">
                                {filtered.map(dev => (
                                    <FilterEntry key={dev.name} entry={dev} toggleFilterForEntry={this.props.toggleFilterForEntry} />
                                ))}
                            </ListGroup>
                        ) : <p> <em> None </em> </p>
                }

                <h6> Tracked </h6>
                {
                    tracked.length > 0 ?
                        (
                            <ListGroup className="py-3">
                                {tracked.map(dev => (
                                    <FilterEntry key={dev.name} entry={dev} toggleFilterForEntry={this.props.toggleFilterForEntry} />
                                ))}
                            </ListGroup>
                        ) : <p> <em> None </em> </p>
                }
            </div>
        )
    }
}

export default FilterList;