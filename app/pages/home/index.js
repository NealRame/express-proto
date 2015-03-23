// index.js
// ========
// - author: Neal.Rame. <contact@nealrame.com>

var _ = require('underscore');
var Achievement = require('models/achievement');
var express = require('express');
var path = require('path');


function get(req, res, next) {
    res.render(path.join(__dirname, '/views/home.jade'), {title: 'land page'});
}

module.exports = {
    get: get,
};
