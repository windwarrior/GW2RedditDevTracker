import { connect } from "react-redux";

import ContentList from "../components/content-list";

import { loadOlderContent, loadNewerContent } from "../actions/actions";

const getVisibleDevContent = (devs, filter, allowed_subs) => {
    // All devs who have not been excluded
    let filtered_devs = devs.filter(x => !x.hidden);

    // Compute until when the list of posts of the (included) devs is
    // consistent
    // 1) Devs that have no content to fetch anymore are not considered
    let considered_devs = filtered_devs.filter(x => !x.depleted);

    // 2) Get the date of their oldest fetched post and compute the date to
    //    which the fetched posts are consistent.
    //
    //    In general, this date is the newest of all 'last posts' of all devs
    ///   currently considered
    let consistent_until = considered_devs
        .filter(x => !x.depleted)
        .filter(x => x.content.length > 0)
        .map(x => new Date(x.content[x.content.length - 1].meta.date))
        .reduce((newest, x) => (x > newest ? x : newest), new Date("1970-01-01"));

    // Compute the list of content items
    // 1) Merge content posted by devs
    let content_list = filtered_devs.map(x => x.content).reduce((accum, x) => accum.concat(x), []);

    // 2) Filter on after the considered date
    content_list = content_list.filter(x => new Date(x.meta.date) >= consistent_until);

    // 3) Filter on content only in allowed subs
    content_list = content_list.filter(x => allowed_subs.includes(x.meta.subreddit));

    // 4) Sort
    content_list.sort((a, b) => new Date(b.meta.date) - new Date(a.meta.date));
    // Returns a list of content items that is:
    // 1) Only of non-filtered devs
    // 2) In subreddits that are allowed
    // 3) Chronologically correct with respect to (possible) unfetched content

    return content_list;
};

const mapStateToProps = state => {
    return {
        contents: getVisibleDevContent(state.devs, state.filtered_devs, state.allowed_subs)
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        loadOlder: () => {
            dispatch(loadOlderContent());
        },
        loadNewer: () => {
            dispatch(loadNewerContent());
        }
    };
};

const options = {
    areStatesEqual: (newState, prevState) => {
        // Only update the contents of the presentational component if we are done fetching all devs
        return prevState === newState || newState.currently_fetching.length !== 0;
    }
};

const DevContentList = connect(mapStateToProps, mapDispatchToProps, undefined, options)(
    ContentList
);

export default DevContentList;
