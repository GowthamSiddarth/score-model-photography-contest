const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Admin = require('../../../models/users/Admin');
const User = require('../../../models/users/User');

const typeAdmin = require('../../../models/users/types').ADMIN;
const typeUser = require('../../../models/users/types').USER;

const validateUserLogin = require('../../../helper/validation/user-login');
const { messageResponse, objectResponse } = require('../../../helper/response-entity/response-body');

const secretOrKey = require('../../../config/keys').secretOrKey;
const responseCode = require('../../../config/response-codes');

const login = (email, password, userType) => {
    return new Promise((resolve, reject) => {
        const { errors, isValid } = validateUserLogin(email, password);

        if (!isValid) {
            resolve(objectResponse(false, errors, responseCode.FOUR_HUNDRED));
        }

        const authUser = typeAdmin === userType ? Admin : typeUser === userType ? User : undefined;

        if (undefined === authUser) resolve(messageResponse(false, "Could not identify user type!", responseCode.FIVE_HUNDRED));

        authUser.findOne({ email: email }).then(user => {
            if (!user) {
                errors.email = `${userType.toLowerCase()} not found!`;
                resolve(objectResponse(false, errors, responseCode.FOUR_O_FOUR));
            }

            bcrypt.compare(password, user.password).then(matched => {
                if (matched) {
                    const jwtPayload = {
                        id: user.id,
                        name: user.name,
                        isAdmin: true
                    };

                    jwt.sign(jwtPayload, secretOrKey, { expiresIn: 31556926 }, (err, token) => {
                        if (err) reject(err);
                        else
                            resolve(objectResponse(true, { token: "Bearer " + token }, responseCode.TWO_HUNDRED));
                    });
                } else {
                    errors.password = "Password Incorrect!";
                    resolve(objectResponse(false, errors, responseCode.FOUR_HUNDRED));
                }
            });
        }).catch(err => reject(err));
    });
};

module.exports = login;