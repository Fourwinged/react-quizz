
/* Not found
**
** Error page
*/

import React from 'react';
import Meta from '../shared/components/Meta';
import Title from '../shared/components/Title';

// We create a React component class
class NotFound extends React.Component {

    // Render function
    render() {
        return (
            <div>
                <Meta title={ this.props.title } description="Un quizz basique, construit avec HapiJS, React et Redux." />
                <Title text={ this.props.title } />
                <article className="card">
                    <h2 className="card-header">Oups, cette page n'existe pas ou a été déplacée.</h2>
                </article>
            </div>
        );
    }
    
}

// In dev mode, checks if the passed properties are of the correct type
NotFound.propTypes = {
    store: React.PropTypes.object,
    dispatch: React.PropTypes.func,
    items: React.PropTypes.array,
    config: React.PropTypes.object,
    title: React.PropTypes.string
};

export default NotFound;
