const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User'); // Replace this with your user model

passport.use(
  new GoogleStrategy(
    {
      clientID: 
      clientSecret: 
      callbackURL: 
    },
    async (accessToken, refreshToken, profile, done) => {
      // Check if user already exists in your database
      let user = await User.findOne({ googleId: profile.id });

      if (!user) {
        // Create a new user if not exists
        user = new User({
          googleId: profile.id,
          username: profile.displayName,
          // You might want to save more profile information here
        });
        await user.save();
      }

      return done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
