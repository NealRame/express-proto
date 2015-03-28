// index.js
// ========
// - author: Neal.Rame. <contact@nealrame.com>

var _ = require('underscore');
var path = require('path');

function get(req, res) {
    res.render(path.join(__dirname, '/views/home.jade'), {title: 'Land page'});
}

module.exports = {
    get: get,
};
