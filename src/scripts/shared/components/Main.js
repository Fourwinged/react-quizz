
/* Main
**
** Base component where routes are injected
*/

import React from 'react';

class Main extends React.Component {

    render() {
        return (
            <main className="base-main">
                { this.props.children }
            </main>
        );
    }
    
}

Main.propTypes = {
    children: React.PropTypes.object
};

export default Main;
