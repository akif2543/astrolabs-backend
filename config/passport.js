const { Strategy, ExtractJwt } = require("passport-jwt");
require("dotenv").config();

// const { Strategy, ExtractJwt } = PassportJWT;

const User = require("../models/User");

// const JwtStrategy = PassportJWT.Strategy; //Generates JWT
// const ExtractJwt = PassportJWT.ExtractJwt; //Extracts payload (username, pass)
const secret = process.env.SECRET;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret,
};
// Create a function for authentication
const initPassportStrategy = (passport) => {
  // Initiate JwtStrategy
  const theJwtStrategy = new Strategy(opts, async (jwtPayload, done) => {
    try {
      const user = await User.findById(jwtPayload.id);
      return user ? done(null, user) : done(null, false);
    } catch (err) {
      console.log("error", err);
      return done(null, null);
    }
  });

  passport.use(theJwtStrategy);
};

module.exports = initPassportStrategy;
