const express = require('express');
const router = express.Router();
const passport = require('passport');
const models = require('../models/models');

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
    const profile_pic = req.user.photos[0] ? req.user.photos[0].value.split('?')[0] : "";
    const name = req.user.displayName;
    const uid = req.user.id;
    const rank = 1;

    models.user.findByUID( uid )
      .catch( _ => models.user.create({ name, uid, profile_pic, rank }))
      .then( user => {
        req.session.user = { name: user.name, id: user.id };
        res.redirect('/');
      });
  }
);

module.exports = router;
