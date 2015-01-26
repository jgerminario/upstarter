var express = require('express');
var app = express();

var path = require('path');

var favicon = require('serve-favicon');

var logger = require('morgan');
app.use(logger('dev'));

var cookieParser = require('cookie-parser');
app.use(cookieParser());

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var mongoose = require('mongoose')
mongoose.connect('mongodb://admin:upstarter@ds041157.mongolab.com:41157/upstarter')

var fs = require('fs')

var dotenv = require('dotenv');
dotenv.load();

var passport = require('passport')
app.use(passport.initialize());
app.use(passport.session());


var session = require('express-session')
app.use(session({
    secret:'somesecrettokenhere',
    resave: true,
    saveUninitialized: true
}));

// var LinkedInStrategy = require('passport-linkedin').Strategy;

app.use(express.static(path.join(__dirname, 'public')));

var routes = require('./routes/sessions');
// var sessions = require('./routes/sessions');
var users = require('./routes/users');
var startups = require('./routes/startups');
var test = require('./routes/test');


var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, Authorization, Token');
    next();
};

var validateCredentials = function(req, res, next){
    console.log(req.headers);
    if (req.headers.authorization == 'token ' + process.env.UPSTARTER_KEY){
        res.contentType('application/json'); //setting response as JSON
        next();
    } else {
        res.status(401).end("Access forbidden");
    }
};

// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

// app.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

app.use('/', routes);
// app.use('/sessions', sessions);
app.use('/users', users);
app.use('/startups', startups);
app.use('/test', test);

// catch 404 and forward to error handler

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

fs.readdirSync(__dirname + '/models').forEach(function(filename) {
    if (~filename.indexOf('.js')) require(__dirname + '/models/' + filename)
});

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
