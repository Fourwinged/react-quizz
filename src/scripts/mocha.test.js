
/* TEST - Mocha
**
** Tests if Mocha is working. Try 'npm test'
*/

import {React, assert, expect, TestUtils} from './test/test-helper';

var foo = 'bar';

describe('Mocha', () => {
    it('should be working', () => {
        foo.should.be.a('string');
        foo.should.equal('bar');
        foo.should.have.length(3);
    });
});
