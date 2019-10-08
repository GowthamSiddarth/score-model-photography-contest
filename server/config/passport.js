const JwtStrategy = require('passport-jwt').JwtStrategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');

const User = mongoose.model('users');

const secretOrKey = require("./keys").secretOrKey;

let options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secretOrKey
};

module.exports = passport => {
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
    });
};
