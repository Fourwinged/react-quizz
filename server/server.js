'use strict'

/* Server
**
** Based on hapiJS and React.
** Serves various routes, static files.
** Manages the server-side rendering.
*/

let Path = require('path');
let Hapi = require('hapi');
let Good = require('good');
let Inert = require('inert');
let React = require('react');
let axios = require('axios');

// Babel register hook, provides transpiling for ES2015 files
require('babel/register');

// Custom render function
let renderWithProps = require('./render');

// Define page routes
let Routes = require('../config/Routes');

// Define the APIs to call
let SourceApis = require('../config/sourceApis');

// Import the Redux actions
let Actions = require('../src/scripts/shared/Actions');


/* Setup the server
*/

let server = new Hapi.Server({
    connections: {
        router: {
            stripTrailingSlash: true
        }
    }
});

server.connection({
    address: 'localhost',
    port: 3000
});


/* Register plugins
*/

server.register([
    // Log events using Good
    {
        register: Good,
        options: {
            reporters: [
                // Good-console logs in the server console
                {
                    reporter: require('good-console'),
                    events: {
                        response: '*',
                        log: '*'
                    }
                },
                // Good-file logs in a text file at root
                {
                    reporter: require('good-file'),
                    events: {ops: '*'},
                    config: './log.txt'
                }
            ],
        },
    },
    // Serve static files using Inert
    Inert,
],

// If plugins fail to load, throw an error
(error) => {
    if(error) {
        throw error;
    }
});


/* Static files
*/

server.route({
    method: 'GET',
    path: '/static/{param*}',
    handler: {
        directory: {
            path: Path.join(__dirname, '../static'),
            listing: true
        }
    }
});


/* Data requests
**
** Requests made to /data/coniferes will consume the API defined in SourceApis.coniferes
*/

server.route({
    method: 'GET',
    path: '/data/{source}',
    handler: function(request, reply) {
        // Prevent XSS
        let sourceName = encodeURIComponent(request.params.source);

        // If the source exists, fetch it and reply using its data
        if(SourceApis[sourceName]) {
            axios.get(SourceApis[sourceName])
            .then(function(response){
                reply(response.data);
            });
        }
        // If it's undefined, reply is null
        else {
            reply(null);
        }
        
    }
});


/* Import routes
*/

let hapiRoutes = [];
let routeLength = Routes.routeConfigs.length;

// Iterate through the route configuration objects in config/Routes
for(let i = 0; i < routeLength; i++) {
    // Create a route object for each
    let route = {
        method: 'GET',
        path: Routes.routeConfigs[i].path,
        handler: (request, reply) => {
            return renderWithProps(request.url, Routes.routeConfigs[i])
            .then((output) => {
                reply(output);
            });
        }
    };
    // Add the created route
    hapiRoutes.push(route);
}
// Init the routes with Hapi
server.route(hapiRoutes);


/* Start the server
*/

server.start((error) => {
    // If the server fails to start, throw an error
    if(error) {
        throw error;
    }
    // Log when the server starts
    server.log('info', '\x1b[34mServer running at: \x1b[32m\x1b[1m' + server.info.uri + '\x1b[0m');
});
