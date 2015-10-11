
/* Document
**
** Base HTML document
*/

import React from 'react';

class Document extends React.Component {

    constructor(props) {
        super(props);
        this.createScript = this.createScript.bind(this);
        this.createStylesheet = this.createStylesheet.bind(this);
    }

    createScript(file) {
        return (
            <script key={ file } type="text/javascript" src={ file }></script>
        );
    }

    createStylesheet(file) {
        return (
            <link key={ file } rel="stylesheet" type="text/css" href={ file }></link>
        );
    }

    render() {
        var scripts = this.props.dev ? this.createScript(this.props.scriptPath + 'static/scripts/bundle.js') : this.props.scripts.map(this.createScript);
        var styles = this.props.dev ? null : this.props.styles.map(this.createStylesheet);

        return (
            <html>
                <head>
                    <meta charSet="utf-8"></meta>
                    <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
                    <title dangerouslySetInnerHTML={ {__html: this.props.head.title} }></title>
                     { styles }
                     <link href="https://fonts.googleapis.com/css?family=Londrina+Solid" rel="stylesheet" type="text/css"></link>
                </head>
                <body>
                    <div id="root" dangerouslySetInnerHTML={ {__html: this.props.children} }>
                    </div>
                    <script type="text/javascript"
                            dangerouslySetInnerHTML={ {__html: this.props.stringState} }>
                    </script>
                    { scripts }
                </body>
            </html>
        );
    }

}

Document.propTypes = {
    dev: React.PropTypes.bool,
    meta: React.PropTypes.object,
    head: React.PropTypes.object,
    styles: React.PropTypes.array,
    scripts: React.PropTypes.array,
    config: React.PropTypes.object,
    children: React.PropTypes.string,
    scriptPath: React.PropTypes.string,
    stringState: React.PropTypes.string
};

export default Document;
