import {
    RECEIVE_DEV_LIST,
    RECEIVE_CONTENT_FOR_DEV,
    RECEIVE_PARENT_CONTENT,
    FETCHING_CONTENT_FOR_DEV,
    Offset,
    TOGGLE_FILTER_FOR_DEV,
    FLIP_TOGGLE
} from "../actions/actions";

const initialState = {
    devs: [],
    filter: [],
    allowed_subs: ["Guildwars2"],
    currently_fetching: [],
    toggles: [
        {
            name: "Dark Mode",
            state: false
        }
    ]
};

function devTrackerApp(state = initialState, action) {
    switch (action.type) {
        case RECEIVE_DEV_LIST:
            let known_devs = state.devs.map(x => x.name);

            let new_devs = action.devs.filter(x => !known_devs.includes(x)).map(y => {
                return {
                    name: y,
                    depleted: false,
                    hidden: false,
                    content: []
                };
            });

            return {
                ...state,
                devs: state.devs.slice().concat(new_devs)
            };
        case FETCHING_CONTENT_FOR_DEV:
            let currently_fetching = state.currently_fetching.slice();
            currently_fetching.push(action.dev.name);

            return {
                ...state,
                currently_fetching
            };
        case RECEIVE_CONTENT_FOR_DEV:
            return {
                ...state,
                currently_fetching: state.currently_fetching
                    .slice()
                    .filter(y => y !== action.dev.name),
                devs: state.devs.map(x => {
                    if (x.name === action.dev.name) {
                        let content;

                        if (action.offset === Offset.OLDER) {
                            content = x.content.slice().concat(action.content);
                        } else if (action.offset === Offset.NEWER) {
                            content = action.content.concat(x.content.slice());
                        } else {
                            content = action.content;
                        }

                        return {
                            ...x,
                            content,
                            depleted:
                                action.content.length !== action.limit &&
                                action.offset !== Offset.NEWER
                        };
                    } else {
                        return x;
                    }
                })
            };
        case RECEIVE_PARENT_CONTENT:
            return {
                ...state,
                devs: state.devs.map(x => {
                    let index = x.content.findIndex(y => y.id === action.comment_id);

                    if (index >= 0) {
                        let newContent = x.content.slice();

                        newContent[index] = {
                            ...x.content[index],
                            parent_content: action.content
                        };

                        return {
                            ...x,
                            content: newContent
                        };
                    } else {
                        return x;
                    }
                })
            };
        case TOGGLE_FILTER_FOR_DEV:
            return {
                ...state,
                devs: state.devs.map(x => {
                    if (x.name === action.devName) {
                        return {
                            ...x,
                            hidden: !x.hidden
                        };
                    } else {
                        return x;
                    }
                })
            };
        case FLIP_TOGGLE:
            return {
                ...state,
                toggles: state.toggles.map(x => {
                    if (x.name === action.toggleName) {
                        return {
                            ...x,
                            state: !x.state
                        };
                    } else {
                        return x;
                    }
                })
            };
        default:
            return state;
    }
}

export default devTrackerApp;
