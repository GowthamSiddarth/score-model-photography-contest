const bcrypt = require('bcryptjs');

const User = require('../../../models/users/User');

const { messageResponse, objectResponse } = require('../../../helper/response-entity/response-body');

const validateUserRegister = require('../../../helper/validation/user-register');

const responseCode = require('../../../config/response-codes');

const register = (name, email, password, confirm_password) => {
    return new Promise((resolve, reject) => {
        let { errors, isValid } = validateUserRegister(name, email, password, confirm_password);

        if (!isValid) {
            resolve(objectResponse(false, errors, responseCode.FOUR_HUNDRED));
        }

        User.findOne({ email: req.body.email }).then(user => {
            if (user) {
                errors.email = "email already registered!";
                resolve(objectResponse(false, errors, responseCode.FOUR_HUNDRED));
            } else {
                const newUser = new User({
                    email: req.body.email,
                    name: req.body.name,
                    password: req.body.password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    if (err) reject(err);
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) {
                            reject(err);
                        } else {
                            newUser.password = hash;
                            newUser.save()
                                .then(user => resolve(messageResponse(true, "User created")))
                                .catch(err => resolve(messageResponse(false, "Internal Server Error!", responseCode.FIVE_HUNDRED)));
                        }
                    });
                });
            }
        });
    });

}

module.exports = register;