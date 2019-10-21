const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Admin = require('../../../models/users/Admin');
const User = require('../../../models/users/User');

const typeAdmin = require('../../../models/users/types').ADMIN;
const typeUser = require('../../../models/users/types').USER;

const validateUserLogin = require('../../../helper/validation/user-login');
const { simpleMessageResponse } = require('../../../helper/response-entity/response-body');

const secretOrKey = require('../../../config/keys').secretOrKey;

const login = (req, res, userType) => {
    const { errors, isValid } = validateUserLogin(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const { email, password } = req.body;
    const authUser = typeAdmin === userType ? Admin : typeUser === userType ? User : undefined;

    if (undefined === authUser) return res.status(500).json(simpleMessageResponse(false, "Could not identify user type!"));

    authUser.findOne({ email: email }).then(user => {
        if (!user) {
            errors.email = `${userType.toLowerCase()} not found!`;
            return res.status(404).json(errors);
        }

        bcrypt.compare(password, user.password).then(matched => {
            if (matched) {
                const jwtPayload = {
                    id: user.id,
                    name: user.name,
                    isAdmin: true
                };

                jwt.sign(jwtPayload, secretOrKey, { expiresIn: 31556926 }, (_err, token) => {
                    return res.json({
                        success: true,
                        token: "Bearer " + token
                    });
                });
            } else {
                errors.password = "Password Incorrect!";
                return res.status(400).json(errors);
            }
        });
    });
};

module.exports = login;