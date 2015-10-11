
/* Entry
**
** The entry point used by webpack to bundle the app.
** Configures and mounts the React app
*/

import React from 'react';
import {Router} from 'react-router';
import {Provider} from 'react-redux';
import reducer from './shared/Reducers';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import {createRoutes} from '../../config/Routes';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import {setConfigs, setPage, setTitle, fetchData} from './shared/Actions';

// Polyfill promises
import Promise from 'es6-promise';
Promise.polyfill();

// Require the CSS
require('../styles/style.scss');

// Require the images
require.context('../images', true, (/.*/));


// Redux store and middlewares
var loggerMiddleware = createLogger();
var createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
)(createStore);

var store = createStoreWithMiddleware(reducer);

// Create the routes
var routes = createRoutes();

// Set the configs, page and title.
store.dispatch(setConfigs(PROPS.configs));
store.dispatch(setPage(PROPS.config.page));
store.dispatch(setTitle(PROPS.titles[PROPS.config.page]));

// Fetch or store the data corresponding to the route
store.dispatch(fetchData(PROPS.config.source, PROPS.data, PROPS.state.dataSources[PROPS.config.source.name]))
.then(() => {
    // Render the React component, with Redux and react-router wrappers
    React.render((
        <Provider store={ store }>
            { () =>
                <Router history={ createBrowserHistory() }>
                    { routes }
                </Router>
            }
        </Provider>
        ),
        document.getElementById('root')
    );
});
