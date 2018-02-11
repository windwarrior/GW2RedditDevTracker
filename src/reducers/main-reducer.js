import { RECEIVE_DEV_LIST,RECEIVE_CONTENT_FOR_DEV, RECEIVE_PARENT_CONTENT, FETCHING_CONTENT_FOR_DEV, Offset } from '../actions/actions';

const initialState = {
    "devs": [],
    "filtered_devs": [],
    "allowed_subs": ["Guildwars2"],
    "currently_fetching": []
}

function devTrackerApp(state = initialState, action) {
    switch (action.type) {
        case RECEIVE_DEV_LIST:
            return {
                ...state,
                devs: action.devs.map(x => ({
                    name: x,
                    depleted: false,
                    content: []
                }))
            }
        case FETCHING_CONTENT_FOR_DEV:
            let currently_fetching = state.currently_fetching.slice();
            currently_fetching.push(action.dev.name);

            return {
                ...state,
                currently_fetching
            }
        case RECEIVE_CONTENT_FOR_DEV:
            return {
                ...state,
                currently_fetching: state.currently_fetching.slice().filter(y => y !== action.dev.name),
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
                            depleted: action.content.length !== action.limit
                        }
                    } else {
                        return x;
                    }
                })
            }
        case RECEIVE_PARENT_CONTENT:
            return {
                ...state,
                devs: state.devs.map(x => {
                    let index = x.content.findIndex(y => y.id === action.comment_id)
                    
                    if (index >= 0) {
                        let newContent = x.content.slice();

                        newContent[index] = {
                            ...x.content[index],
                            parent_content: action.content
                        }

                        return {
                            ...x,
                            content: newContent
                        }
                    } else {
                        return x;
                    }
                })
            }
        default:
            return state;

    }
}

export default devTrackerApp;