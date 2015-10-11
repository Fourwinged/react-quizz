
/* Test DOM
**
** Prepares a virtual DOM using jsdom, allowing for React testing
*/

var jsdom = require('jsdom');

// Setup the simplest document possible
var doc = jsdom.jsdom('<!doctype html><html><body></body></html>');

// Get the window object out of the document
var win = doc.defaultView;

// Set globals for Mocha for a more natural access to document and window
global.document = doc;
global.window = win;

// From mocha-jsdom https://github.com/rstacruz/mocha-jsdom/blob/master/index.js#L80
function propagateToGlobal(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key) && key in global) {
            global[key] = obj[key];
        }
    }
}

// Attach properties of the window object to the Mocha global object
propagateToGlobal(win);
