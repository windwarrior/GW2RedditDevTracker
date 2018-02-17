import { thingToContent } from '../utils/reddit-utils';

// Enum indicating whether a newly fetched content is before or after 
// previously fetched content.
export const Offset = Object.freeze({
    NEWER: Symbol("newer"),
    NONE: Symbol("none"),
    OLDER: Symbol("older")
})


// Load dev list from json file
export function loadDevList() {
    return function (dispatch) {
        return fetch('devs.json')
            .then(response => response.json())
            .then(json => dispatch(receiveDevList(json)))
    }
}

export const RECEIVE_DEV_LIST = 'RECEIVE_DEV_LIST';

export function receiveDevList(devs) {
    return {
        type: RECEIVE_DEV_LIST,
        devs: devs
    }
}

// Load comments/posts for a single dev
export function fetchContentForDev(dev, limit, offset) {
    limit = limit || 100;
    offset = offset || Offset.NONE;
    let offset_str = "";

    if (offset === Offset.NEWER) {
        offset_str = `&before=${dev.content[0].id}`;
    } else if (offset === Offset.OLDER) {
        offset_str = `&after=${dev.content[dev.content.length - 1].id}`;
    }

    return dispatch => {
        dispatch(fetchingContentForDev(dev));

        return fetch(`https://www.reddit.com/user/${dev.name}.json?limit=${limit}${offset_str}`)
            .then(response => response.json())
            .then(json => {
                return json.data ? json.data.children.map(x => thingToContent(x)) : [];
            }).then(content => dispatch(receiveContentForDev(dev, limit, offset, content)))
    }
}

export const FETCHING_CONTENT_FOR_DEV = "FETCHING_CONTENT_FOR_DEV";

export function fetchingContentForDev(dev) {
    return {
        type: FETCHING_CONTENT_FOR_DEV,
        dev
    }
}

export const RECEIVE_CONTENT_FOR_DEV = "RECEIVE_CONTENT_FOR_DEV";

export function receiveContentForDev(dev, limit, offset, content) {
    return {
        type: RECEIVE_CONTENT_FOR_DEV,
        dev,
        limit,
        offset,
        content
    }
}

// Load a parent comment to a top level comment
export function loadParentContent(comment_id, parent_id) {
    return dispatch => {
        fetch(`https://www.reddit.com/api/info.json?id=${parent_id}`)
            .then(response => response.json())
            .then(json => thingToContent(json.data.children[0]))
            .then(content => dispatch(receiveParentContent(comment_id, content)))
    }

}

export const RECEIVE_PARENT_CONTENT = "RECEIVE_PARENT_CONTENT";

export function receiveParentContent(comment_id, content) {
    return {
        type: RECEIVE_PARENT_CONTENT,
        comment_id,
        content
    }
}

// Composite actions
export function update() {
    return function (dispatch, getState) {
        dispatch(loadDevList()).then(() =>
            Promise.all(
                getState().devs
                    .map(x => {
                        if (x.content.length === 0 && !x.depleted) {
                            // New dev, never fetched
                            return dispatch(fetchContentForDev(x, 25, Offset.NONE))
                        } else if (!x.depleted) {
                            return dispatch(fetchContentForDev(x, 100, Offset.NEWER))
                        }

                        return Promise.resolve();
                    }
                )
            )
        );
    }
}

export function loadOlderContent() {
    return function (dispatch, getState) {
        if (getState().currently_fetching.length > 0) return;

        let devs = getState().devs.slice().filter(x => !x.depleted);
        devs.sort(
            (a, b) => {
                return new Date(b.content[b.content.length - 1].meta.date) - new Date(a.content[a.content.length - 1].meta.date)
            }
        );

        Promise.all(devs.slice(0, 3)
            .map(x => dispatch(fetchContentForDev(x, 25, Offset.OLDER)))
        )
    }
}

export function loadNewerContent() {
    return function (dispatch, getState) {
        if (getState().currently_fetching.length > 0) return;

        Promise.all(getState().devs
            .map(x => dispatch(fetchContentForDev(x, 25, Offset.NEWER)))
        )
    }
}

export const TOGGLE_FILTER_FOR_DEV = "TOGGLE_FILTER_FOR_DEV";

export function toggleFilterForDev(devName) {
    return {
        type: TOGGLE_FILTER_FOR_DEV,
        devName
    }
}