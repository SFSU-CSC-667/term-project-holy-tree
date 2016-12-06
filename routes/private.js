var express = require('express');
var router = express.Router();
var passport = require('passport');
var db = require('../db');

var credentials;
try {
  credentials = require('../credentials');
} catch(err) {
  if(err.code === 'MODULE_NOT_FOUND'){
    credentials = {
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET
    };
  }
}

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

router.use(passport.initialize());

/* Serializes the login session to a cookie */
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new GoogleStrategy({
    clientID: credentials.GOOGLE_CLIENT_ID,
    clientSecret: credentials.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_HOST + "/private/"
  },
  function(accessToken, refreshToken, profile, done) {
      return done(null, profile);
  }
));

router.get('/',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'], failureRedirect: process.env.GOOGLE_CALLBACK_HOST }),
  function(req, res) {
    req.session.user = { name: req.user.displayName };

    db.one("SELECT * FROM users WHERE uid = $1", [ req.user.id ], user => user)
      .then( user => {
        req.session.user.id = user.id;
        res.redirect('/');
      })
      .catch( error => {
        db.one("INSERT INTO users (name, uid) VALUES($1, $2)", [ req.user.displayName, req.user.id ], user => user)
          .then( user => {
            req.session.user.id = user.id;
            res.redirect('/');
          })
          .catch( error => { console.log("ERROR:", error.message || error) });
      });
  }
);

module.exports = router;
