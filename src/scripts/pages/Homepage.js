
/* Homepage
**
** The home page
*/

import React from 'react';
import Helmet from 'react-helmet';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import Title from '../shared/components/Title';

// We create a React component class
class Homepage extends React.Component {

    // The constructor method
    constructor(props) {
        super(props);
        // Bind 'this' keyword in class methods
        this.makeItem = this.makeItem.bind(this);
    }

    // Function that takes an array item, and creates a list item from it
    makeItem(item, index) {
        return (
            <li key={ index } className="technos-item">{ item }</li>
        );
    }

    // Render function
    render() {
        // Turn the technos array into components using makeItem()
        var technos = this.props.items.map(this.makeItem);

        // Return the homepage markup
        return (
            <div>
                <Helmet
                    title={ this.props.title }
                    titleTemplate="Quizz - %s"
                    meta={ [
                        {name: 'description', content: 'Un quizz basique, construit avec HapiJS, React et Redux.'}
                    ] } />
                <Title text={ this.props.title } />
                <article className="card">
                    <h2 className="card-header">{ this.props.intitule }</h2>
                    <p className="start">
                        <img className="start-image" src="/static/images/homepage/sapin.png" alt="Illustration" />
                        <Link className="start-btn" to="/coniferes">Commencer le quizz</Link>
                    </p>
                </article>
                <article className="card">
                    <ul className="technos">
                        { technos }
                    </ul>
                </article>
            </div>
        );
    }
    
}

// In dev mode, checks if the passed properties are of the correct type
Homepage.propTypes = {
    store: React.PropTypes.object,
    dispatch: React.PropTypes.func,
    items: React.PropTypes.array,
    config: React.PropTypes.object,
    title: React.PropTypes.string,
    intitule: React.PropTypes.string
};

// Inject props from the global state tree
function select(state) {
    return {
        title: state.title,
        intitule: state.dataSources.technos.intitule,
        items: state.dataSources.technos.data
    };
}

// Wrap the component to inject state and dispatch()
export default connect(select)(Homepage);
