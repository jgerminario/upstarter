var express = require('express');
var app = express();
var passport = require('passport')
LinkedinStrategy = require('passport-linkedin-oauth2').Strategy;

var User = require('./models/users');
var logger = require('morgan');
var dotenv = require('dotenv');
dotenv.load();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session')

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(cookieParser());
app.use(allowCrossDomain);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret:'somesecrettokenhere',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));

var routes = require('./routes/sessions');
var users = require('./routes/users');
var startups = require('./routes/startups');
var test = require('./routes/test');

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, Authorization, Token');
    next();
};

// var validateCredentials = function(req, res, next){
//     console.log(req.headers);
//     if (req.headers.authorization == 'token ' + process.env.UPSTARTER_KEY){
//         res.contentType('application/json'); //setting response as JSON
//         next();
//     } else {
//         res.status(401).end("Access forbidden");
//     }
// };


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(allowCrossDomain);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.get('/startups/*', validateCredentials);
>>>>>>> unsuccessful in adding auth to cors call, authorization token not included on get call after preflight, iceboxing it

app.use('/', routes);
app.use('/users', users);
app.use('/startups', startups);
app.use('/test', test);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

mongoose.connect('mongodb://admin:upstarter@ds041157.mongolab.com:41157/upstarter')

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log("connection open");
});

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
