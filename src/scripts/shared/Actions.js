
/* Actions
**
** Actions are small chunks of data that are used to change the global app state.
** Action creators are small functions that create actions and dispatch it to the store.
*/

import axios from 'axios';
import {filterData, filterCompleted, randomize} from './Helpers';


/* Action types
 */

// User action
export var SET_CONFIGS = 'SET_CONFIGS';
export var SET_TITLE = 'SET_TITLE';
export var SET_PAGE = 'SET_PAGE';
export var GET_PAGE = 'GET_PAGE';

// Data fetching and manipulation
export var REQUEST_DATA = 'REQUEST_DATA';
export var RECEIVE_DATA = 'RECEIVE_DATA';
export var SHUFFLE_DATA = 'SHUFFLE_DATA';
export var FETCH_DATA = 'FETCH_DATA';


/* Action creators
 */

export function requestData(source) {
    return {type: REQUEST_DATA, source: source};
}

export function receiveData(source, data, intitule) {
    return {
        type: RECEIVE_DATA,
        source: source,
        intitule: intitule,
        data: data,
        receivedAt: Date.now()
    };
}

export function shuffleData(source, data, intitule, completed) {
    var filtered = filterCompleted(data.items, completed);
    var questions = randomize(filtered, 3);
    return {
        type: SHUFFLE_DATA,
        source: source,
        intitule: intitule,
        data: {
            items: filtered,
            questions: questions,
            answer: randomize(questions)
        },
        shuffledAt: Date.now()
    };
}

export function fetchData(source, data, items, base = '') {
    return function(dispatch) {
        var alreadyFetched = data && data[source.name] && data[source.name].data;
        var intitule = '';

        if(data && data[source.name]) {
            intitule = data[source.name].intitule;
        }

        // If no source exists
        if(!source) {
            return new Promise((resolve) => {
                resolve();
            });
        }

        // If it's a quizz with data, but without questions
        if(alreadyFetched && source.type === 'quizz' && !data[source.name].data.questions) {
            return new Promise((resolve) => {
                dispatch(shuffleData(source.name, data[source.name], intitule));
                resolve();
            });
        }
        // If the data is ready
        else if(alreadyFetched) {
            return new Promise((resolve) => {
                dispatch(receiveData(source.name, data[source.name].data, intitule));
                resolve();
            });
        }

        // Tell the state we're fetching this data source
        dispatch(requestData(source.name));

        // Fetch the remote data
        return axios.get(base + '/data/' + source.name)
        .then((response) => {
            // Filter the data and shuffle it
            if(source.type === 'quizz') {
                var filtered = filterData(response.data.data.items);
                return dispatch(shuffleData(source.name, {items: filtered}, response.data.intitule));
            }
        })
        .catch(() => {
            return;
        });
    };
}

export function setConfigs(configs) {
    return {type: SET_CONFIGS, configs: configs};
}

export function setTitle(title) {
    return {type: SET_TITLE, title: title};
}

export function setPage(page) {
    return {type: SET_PAGE, page: page};
}
