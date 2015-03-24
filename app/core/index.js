var _ = require('underscore');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var express = require('express');
var favicon = require('serve-favicon');
var logger = require('morgan');
var mongoose = require('mongoose');
var path = require('path');

var app;

exports.instance = function() {
    if (app) {
        return Promise.resolve(app);
    }

    var config = require('core/config');

    return (new Promise(function(resolve, reject) {
        mongoose.connect(config.database.fullURI).connection
            .once('open', resolve)
            .once('error', reject);
    })).then(function(conn) {
        var app = express();

        app.set('config', config);

        // view engine setup
        app.set('view engine', 'jade');
        app.set('views', path.join(__dirname, 'views'));
        app.locals.basedir = app.get('views');

        // uncomment after placing your favicon in /public
        //app.use(favicon(__dirname + '/public/favicon.ico'));
        app.use(logger('dev'));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(cookieParser());

        app.use(express.static(path.join(__dirname, '..', '..', 'public')));

        _.forEach(config.pages, function(page_config) {
            var page = require(path.join('pages', page_config.name));

            app.get(page_config.route, page.get);
            
        });

        // catch 404 and forward to error handler
        app.use(function(req, res, next) {
            var err = new Error('Not Found');
            err.status = 404;
            next(err);
        });

        // error handlers
        app.use(function(err, req, res, next) {
            var error = _.defaults(
                _.pick(err, 'message', 'status'), {
                    message: 'Internal server error',
                    status: 500
                }
            );

            if (app.get('env') === 'development' && err.stack) {
                error.stack = err.stack;
            }
            res.status(error.status);
            if (req.api) {
                res.send(error);
            } else {
                res.render('error', {error: error});
            }
        });

        return app;
    });
};
