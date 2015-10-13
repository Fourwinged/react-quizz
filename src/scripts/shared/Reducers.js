
/* Reducers
**
** Pure functions that calculate the new state depending on received actions.
*/

import {combineReducers} from 'redux';
import {
    SET_CONFIGS,
    SET_TITLE,
    SET_PAGE,
    REQUEST_DATA,
    RECEIVE_DATA,
    SHUFFLE_DATA
} from './Actions';

// Object.assign() polyfill
import objectAssign from 'object-assign';

var defaultTitle = 'Titre';

function configs(state = {}, action) {
    switch (action.type) {
        case SET_CONFIGS:
            var newState = {};
            var configsLength = action.configs.length;
            for(var i = 0; i < configsLength; i++) {
                newState[action.configs[i].name] = action.configs[i];
            }
            return newState;
        default:
            return state;
    }
}

function title(state = defaultTitle, action) {
    switch (action.type) {
        case SET_TITLE:
            return action.title;
        default:
            return state;
    }
}

function page(state = '', action) {
    switch (action.type) {
        case SET_PAGE:
            return action.page;
        default:
            return state;
    }
}

function data(state = {
    isFetching: false,
    intitule: '',
    data: {}
}, action) {
    switch (action.type) {
        case REQUEST_DATA:
            return objectAssign({}, state, {
                isFetching: true
            });
        case RECEIVE_DATA:
            return objectAssign({}, state, {
                isFetching: false,
                intitule: action.intitule,
                data: action.data,
                lastUpdated: action.receivedAt
            });
        case SHUFFLE_DATA:
            return objectAssign({}, state, {
                isFetching: false,
                intitule: action.intitule,
                data: action.data,
                lastUpdated: action.shuffledAt
            });
        default:
            return state;
    }
}

function dataSources(state = {}, action) {
    switch (action.type) {
        case RECEIVE_DATA:
        case REQUEST_DATA:
        case SHUFFLE_DATA:
            return objectAssign({}, state, {
                [action.source]: data(state[action.source], action)
            });
        default:
            return state;
    }
}

var reducer = combineReducers({
    configs,
    title,
    page,
    dataSources
});

export default reducer;
