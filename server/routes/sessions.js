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

passport.use(new LinkedinStrategy({
    clientID: process.env.API_KEY,
    clientSecret: process.env.SECRET_KEY,
    callbackURL: "http://localhost:3000/auth/linkedin/callback",
    scope: [ 'r_fullprofile', 'r_emailaddress', 'r_network'],
    passReqToCallback: true
  },
  function(req, accessToken, refreshToken, profile, done) {
    req.session.accessToken = accessToken;
    process.nextTick(function () {
        return done(null, profile);
    });
  }
));

router.get('/auth/linkedin',
  passport.authenticate('linkedin', { state: 'SOME STATE' }),
  function(req, res){});

router.get('/auth/linkedin/callback',
  passport.authenticate('linkedin', { failureRedirect: '/login' }),
  function(req, res) {
     User.findOne({ email: req.user._json.emailAddress}, function(err, user){
        if (user) {
          user.token = req.session.accessToken;
          var following = []
          req.user._json.following.companies.values.forEach(function(company){
            following.push(company.name)
          })
          user.linkedin.following = following
          user.save(function(error){
            if (error) {throw error}
          })
        } else {
            var following = []
            req.user._json.following.companies.values.forEach(function(company){
              following.push(company.name)
            })
            var newUser = new User({
              email: req.user._json.emailAddress,
              name: req.user.displayName,
              token: req.session.accessToken,
              linkedin: {
                id: req.user.id,
                following: following
              }
            })
            newUser.save(function(error){
              if (error) {throw error}
            })
        }
      })
      res.redirect('http://localhost:8100/')
      // res.send({user: req.user})
  });

router.get('/auth/token', function(req, res){
  res.send({token: req.session.accessToken})
})

router.get('/logout', function(req, res){
  User.findOne({ email: req.user._json.emailAddress}, function(err, user){
    user.token = ""
    user.save();
  });
  req.session.accessToken = null
  req.logout();
  console.log(req.user)
  res.send('logged out');
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}

module.exports = router;
