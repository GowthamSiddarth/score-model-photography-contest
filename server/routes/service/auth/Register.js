const bcrypt = require('bcryptjs');

const User = require('../../../models/users/User');

const { simpleMessageResponse } = require('../../../helper/response-entity/response-body');
const validateUserRegister = require('../../../helper/validation/user-register');

const register = (req, res) => {
    let { errors, isValid } = validateUserRegister(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json(simpleMessageResponse(false, "User already exists!"));
        } else {
            const newUser = new User({
                email: req.body.email,
                name: req.body.name,
                password: req.body.password
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) {
                        throw err;
                    } else {
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(simpleMessageResponse(true, "User created")))
                            .catch(err => {
                                console.log(err);
                                return res.status(500).json(simpleMessageResponse(false, "Internal Server Error"));
                            });
                    }
                });
            });
        }
    });
}

module.exports = register;