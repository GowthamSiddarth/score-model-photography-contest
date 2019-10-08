const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');

const User = mongoose.model('users');

const secretOrKey = require("./keys").secretOrKey;

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secretOrKey
};

module.exports = passport => {
    passport.use(
        new JwtStrategy(options, (jwtPayload, done) => {
            User.findById(jwtPayload.id)
                .then(user => {
                    if (user) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                })
                .catch(err => console.log(err));
        })
    );
};
