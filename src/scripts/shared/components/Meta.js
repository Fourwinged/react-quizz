
/* Meta
**
** Inject metadata using react-helmet
*/

import React from 'react';
import Helmet from 'react-helmet';

class Meta extends React.Component {

    render() {
        return (
            <Helmet
                title={ this.props.title }
                titleTemplate="Quizz - %s"
                meta={ [
                    {name: 'description', content: this.props.description}
                ] } />
        );
    }
    
}

Meta.propTypes = {
    title: React.PropTypes.string,
    description: React.PropTypes.string
};

export default Meta;
