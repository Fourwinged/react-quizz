
/* Hot server
**
** Small Express server, allowing Webpack to hot-mount and reload components.
** Uses a script tag pointing to localhost:3300
*/

var express = require('express');
var webpack = require('webpack');
var config = require('../config/webpack.development');

var app = express();
var compiler = webpack(config);
var PORT = 3300;

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('/', (req, res) => {
    res.send('/n');
});

app.listen(PORT, 'localhost', (error) => {
    if(error) {
        console.log('\x1b[31m' + error + '\x1b[0m');
        return;
    }

    console.log('\x1b[34mWebpack - Listening at \x1b[32m\x1b[1mhttp://localhost:' + PORT + '\x1b[0m');
});
