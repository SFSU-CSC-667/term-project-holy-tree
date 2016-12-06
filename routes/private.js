const express = require('express');
const router = express.Router();
const passport = require('passport');
const db = require('../db');
const User = require('../models/User');

let credentials = {};
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

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

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
    let userProfilePicture = req.user.photos[0] ? req.user.photos[0].value : "";
    let userName = req.user.displayName;

    let user = new User();

    user.findByUID( req.user.id )
        .then( user => {
          req.session.user = { name: user.name, id: user.id };
          res.redirect('/');
        })
        .catch( error => {
          user.create({ name: userName, uid: req.user.id, profile_pic: userProfilePicture, rank: 1 })
              .then( user => {
                req.session.user = { name: user.name, id: user.id };
                res.redirect('/');
              })
              .catch( error => { console.log( "ERROR:", error.message || error ) });
        });
  }
);

module.exports = router;
