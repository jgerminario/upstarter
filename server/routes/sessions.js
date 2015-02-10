var express = require('express');
var router = express.Router();
var bodyparser = require('body-parser');
var urlencode = bodyparser.urlencoded({ extended: false });
var passport = require('passport');
var request = require('request');
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
var User = require('../models/users');
var jwt = require('jwt-simple');

// CrossStorageHub.init([
//   {origin: /192.168.1.228:8100$/, allow: ['get', 'set', 'del', 'getKeys', 'clear']}
// ]);


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
  passport.authenticate('linkedin', { failureRedirect: 'http://localhost:8100/' }),
  function(req, res) {
     User.findOne({ email: req.user._json.emailAddress}, function(err, user){
        if (user) {
          var token = jwt.encode({token: req.session.accessToken}, user.linkedin.id);
          user.token = token
          var following = []
          req.user._json.following.companies.values.forEach(function(company){
            following.push(company.name)
          })
          user.linkedin.following = following
          user.save(function(error){
            if (error) {throw error}
          })
          res.redirect('http://localhost:8100/#/?token='+user.token)
        } else {
            var following = []
            req.user._json.following.companies.values.forEach(function(company){
              following.push(company.name)
            })
            var token = jwt.encode({token: req.session.accessToken}, req.user.id);
            var newUser = new User({
              email: req.user._json.emailAddress,
              name: req.user.displayName,
              token: token,
              linkedin: {
                id: req.user.id,
                following: following
              }
            })
            newUser.save(function(error){
              if (error) {throw error}
            })
            res.redirect('http://localhost:8100/#/?token='+newUser.token)
        }
      })

      // res.setHeader("Set-Cookie", "accessCheese=" + req.session.accessToken);
      // res.cookie('accessToken', req.session.accessToken, {maxAge:900000, httpOnly: false})
      // res.setHeader('Content-Type', 'application/json')
      // res.write({"token": req.session.accessToken})

      // request({
      //   headers: {
      //     'accessToken': req.session.accessToken
      //   },
      //   uri: 'http://192.168.1.228:8100/',
      //   body: req.session.accessToken,
      //   method: 'POST'
      // }, function(err, res, body){
      // });
      // res.writeHead(200)
      // res.write(req.session.accessToken)

      // res.redirect('http://www.yahoo.com')
      // res.redirect('/auth/token')
      // res.send({user: req.user})
  });

router.get('/auth/token', function(req, res){
  res.send({token: req.session.accessToken})
})

router.get('/logout', function(req, res){
  // User.findOne({ email: req.user._json.emailAddress}, function(err, user){
  //   user.token = ""
  //   user.save();
  // });
  req.session.accessToken = null
  req.logout();
  res.send('logged out');
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}

module.exports = router;
