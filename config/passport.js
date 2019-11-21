const PassportJWT = require('passport-jwt');
const JwtStrategy = PassportJWT.Strategy; //Generates JWT
const ExtractJwt = PassportJWT.ExtractJwt; //Extracts payload (username, pass)
const secret = 'Astrolabs'; //process.env.SECRET;

const User = require('../models/UserModel');

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret
};
//Create a function for authentication 
const initPassportStrategy = (passport) => {
    //Initiate JwtStrategy
    const theJwtStrategy = new JwtStrategy(opts, (jwtPayload, done)=>{
        User
        .findById(jwtPayload.id)
        .then((theUser)=>{
            //If user exists, return user
            if(theUser) {
                return done(null, theUser);
            } else {
                return done(null, false);
            }
        })
        .catch((err)=>{
            console.log('error', err);
            return done(null, null);
        })
    });
    passport.use(theJwtStrategy)
};

module.exports = initPassportStrategy;