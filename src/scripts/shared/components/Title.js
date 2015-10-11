
/* Title
**
** Main title of a page
*/

import React from 'react';

class Title extends React.Component {

    render() {
        return (
            <header className="base-header">
                <h1>
                    { this.props.text || 'Soleil' }
                </h1>
            </header>
        );
    }
    
}

Title.propTypes = {
    text: React.PropTypes.string
};

export default Title;
