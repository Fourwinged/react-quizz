'use strict'

/* Render
**
** Renders a component server-side into a template, with provided props.
*/

// Global utilities and React
import fs                              from 'fs';
import Path                            from 'path';
import React                           from 'react';
import Helmet                          from 'react-helmet';

// Router and routes
import createLocation                  from 'history/lib/createLocation';
import {match, RoutingContext}         from 'react-router';
import {createRoutes, routeConfigs} from '../config/Routes';

// Local database
import Database from './database';

// Redux
import {createStore, applyMiddleware}  from 'redux';
import thunkMiddleware                 from 'redux-thunk';
import {Provider}                      from 'react-redux';

// Actions and reducers
import {
    setConfigs,
    setPage,
    setTitle,
    fetchData
} from '../src/scripts/shared/Actions';
import reducer from '../src/scripts/shared/Reducers';

// Document template and main mounting element
import Document from '../src/scripts/shared/components/Document';
import Main from '../src/scripts/shared/components/Main';

// Specific pages
import Pages from '../src/scripts/Pages';


// Redux store and middlewares
const createStoreWithMiddleware = applyMiddleware(
    // Thunk middleware, allows for async action creators
    thunkMiddleware
)(createStore);

// Dev-environment related variables and HTML doctype
const doctype = '<!DOCTYPE html>';
const scriptPath = 'http://localhost:3300/';
const baseUrl = 'http://localhost:3000';
let dev = process.env.NODE_ENV !== 'production'
    ? true
    : false;

// Function to get the timestamped script and CSS
function getFilenames(filePath, array) {
    fs.readdir(Path.join(__dirname, '..' + filePath), (err, files) => {
        if(err) {
            return null;
        }
        files.map((file) => {
            return Path.join(__dirname, '..' + filePath, file);
        }).filter((file) => {
            return fs.statSync(file).isFile();
        }).forEach((file) => {
            array.push(filePath + Path.basename(file));
        });
    });
}

// Get the timestamped scrip and CSS
const scriptDir = '/static/scripts/';
const stylesDir = '/static/styles/';
let scripts = [];
let styles = [];
getFilenames(scriptDir, scripts);
getFilenames(stylesDir, styles);


/* Render function
*/

function renderWithProps(url, config) {

    // Create the store
    let store = createStoreWithMiddleware(reducer);

    // Init props with pages configuration and environment-related stuff
    let props = Object.assign({}, config, {
        dev: dev,
        scriptPath: scriptPath,
        configs: routeConfigs,
        scripts: scripts,
        styles: styles,
    });

    // Populate the store with the correct configuration
    store.dispatch(setConfigs(props.configs));
    store.dispatch(setPage(props.config.page));
    store.dispatch(setTitle(Database.titles[props.config.page]));

    // Fetch the required data
    return store.dispatch(fetchData(props.config.source, Database.data, null, baseUrl))
    .then(() => {

        // Put the store state into the props
        props.state = store.getState();

        // Update the database with the data we fetched
        Database.data = Object.assign({}, Database.data, props.state.dataSources);

        // Add the updated database to the props
        props.titles = Database.titles;
        props.data = Database.data;

        // Pass the props as a string to populate data client-side
        props.stringState = 'PROPS = ' + JSON.stringify(props) + ';';

        // Prepare the main element output
        let mainOutput = '';

        // Create a history location from the url
        let location = createLocation(url.pathname, url.query);

        // Create the routes
        let routes = createRoutes();

        // Match the URL to the correct route
        match({routes, location}, (error, redirectLocation, renderProps) => {

            if(error) {
                mainOutput = {
                    code: 500,
                    output: error.message
                };
            }
            else if(redirectLocation) {
                mainOutput = {
                    code: 301,
                    output: redirectLocation.pathname + redirectLocation.search
                };
            }
            else if(renderProps) {
                mainOutput = {
                    code: 200,
                    output: React.renderToString(
                        <Provider store={ store }>
                            { () => 
                                <RoutingContext { ...renderProps } />
                            }
                        </Provider>
                    )
                };
            }
            else {
                mainOutput = {
                    code: 404,
                    output: 'La page que vous essayez de consulter n\'existe pas.'
                };
            }
        });

        // Rewind react-helmet for reuse, and add head to props for server-side document
        props.head = Helmet.rewind();
        if(!props.head) {
            props.head = {title: ''};
        }

        // Create a React HTML document with the appropriate props, and insert the main component
        let documentElement = React.createElement(Document, props, mainOutput.output);

        // Render the document into static markup
        let documentOutput = React.renderToStaticMarkup(documentElement);

        // Add the doctype and return final output
        return doctype + documentOutput;

    })
    .catch((error) => {
        throw error;
    });

}

export default renderWithProps;
