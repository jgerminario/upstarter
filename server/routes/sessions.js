var express = require('express');
var router = express.Router();
var bodyparser = require('body-parser');
var urlencode = bodyparser.urlencoded({ extended: false });
var passport = require('passport');
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
var User = require('../models/users');

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


passport.use(new LinkedInStrategy({
    clientID: process.env.API_KEY,
    clientSecret: process.env.SECRET_KEY,
    callbackURL:  "http://localhost:3000/auth/linkedin/callback",
    scope:        [ 'r_fullprofile', 'r_emailaddress', 'r_contactinfo'],
    passReqToCallback: true,
    state: true
  },
  function(req, accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    req.session.accessToken = accessToken;
    // console.log(profile.id)
    // console.log("refresh token: " + refreshToken)
    var following = []
    profile._json.following.companies.values.forEach(function(company){
      following.push(company.name)
    })
    process.nextTick(function () {
     User.findOne({email: profile.email}, function(err, user){
        if (user) {
          user.linkedin.token = accessToken;
          user.linkedin.email = profile._json.emailAddress;
          user.linkedin.following = following
          user.save(function(err){
            if (err) {throw err}
          })
        } else {
            newUser = new User({
            linkedin: {
              id: profile.id,
              token: accessToken,
              name: profile.displayName,
              email: profile._json.emailAddress,
              following: following
            }
          });
          newUser.save(function(err){
            if (err) {throw err}
          })
          return newUser
        }
      })
      return done(null, profile);
    });
  }
));


router.get('/', function(req, res){
  res.render('index', { user: req.user });
});

router.get('/account', ensureAuthenticated, function(req, res){
  res.render('account', { user: req.user });
});

router.get('/login', function(req, res){
  res.render('login', { user: req.user });
});

// GET /auth/linkedin
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in LinkedIn authentication will involve
//   redirecting the user to linkedin.com.  After authorization, LinkedIn will
//   redirect the user back to this application at /auth/linkedin/callback
router.get('/auth/linkedin',
  passport.authenticate('linkedin'),
  function(req, res){
    // The request will be redirected to LinkedIn for authentication, so this
    // function will not be called.
  });

// GET /auth/linkedin/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/auth/linkedin/callback',
  passport.authenticate('linkedin', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}

module.exports = router;
