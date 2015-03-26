// index.js
// ========
// - author: Neal.Rame. <contact@nealrame.com>

var _ = require('underscore');
var path = require('path');

function get(req, res) {
    res.render(path.join(__dirname, '/views/bar.jade'), {title: 'Bar'});
}

module.exports = {
    get: get,
};
