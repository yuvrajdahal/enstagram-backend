import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/user-model";

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "76699859768-ctfmievaab8n4nsfrqupjm26qtr8vc33.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:3000/auth/google/callback", // Update with your callback URL
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          // User doesn't exist, create a new user
          let email = "";
          if (profile.emails && profile.emails.length > 0) {
            email = profile.emails[0].value;
          }
          user = new User({
            googleId: profile.id,
            email: email,
            // You can extract and save other relevant user data from the profile
          });
          await user.save();
        }

        return done(null, user);
      } catch (error: any) {
        return done(error);
      }
    }
  )
);
