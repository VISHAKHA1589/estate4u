
import passport from "passport"
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

passport.use(new GoogleStrategy({
    clientID:     '429348943020-p54mmelc9tjkftrbfc6u5g5hsugv569f.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "http://localhost:5000/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));
