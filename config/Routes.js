
/* Routes
**
** Here are configured the app routes, using react-router components and configuration objects.
*/

import React from 'react';
import {IndexRoute, Route} from 'react-router';
import Main from '../src/scripts/shared/components/Main';
import {Homepage, Quizz, NotFound} from '../src/scripts/Pages';


var Routes = {
    // Returns the routes used by react-router, with corresponding URLs
    createRoutes: () => (
        <Route>
            <Route path="/" component={ Main }>
                <IndexRoute component={ Homepage } />
                <Route path="coniferes" component={ Quizz } />
            </Route>
            <Route path="*" component={ NotFound }/>
        </Route>
    ),
    // Define the configuration for each Hapi route
    // path : the URL used to access the route
    // name : the name of the route
    // meta : a meta object to use in the head
    // config.page : the page component to be rendered
    // config.source : name & kind of data source used by the route
    routeConfigs: [
        {
            path: '/',
            name: 'Homepage',
            meta: {
                title: 'Thibaud Salazar'
            },
            config: {
                page: 'Homepage',
                source: {
                    type: 'list',
                    name: 'technos'
                }
            }
        },
        {
            path: '/coniferes',
            name: 'Quizz',
            meta: {
                title: 'Ces arbres étaient mes amis'
            },
            config: {
                page: 'Quizz',
                source: {
                    type: 'quizz',
                    name: 'coniferes'
                }
            }
        }
    ]
};

export default Routes;
