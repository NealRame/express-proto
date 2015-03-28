// index.js
// ========
// - author: Neal.Rame. <contact@nealrame.com>

var _ = require('underscore');
var path = require('path');

function get(req, res) {
    res.render(path.join(__dirname, '/views/foo.jade'), {title: 'Foo'});
}

module.exports = {
    get: get,
};
