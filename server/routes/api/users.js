const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/User');

const validateUserRegister = require('../../helper/validation/user-register');
const validateUserLogin = require('../../helper/validation/user-login');

const { simpleMessageResponse } = require('../../helper/response-entity/response-body');

const secretOrKey = require('../../config/keys').secretOrKey;

router.post('/register', (req, res) => {
    let { errors, isValid } = validateUserRegister(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            res.status(400).json(simpleMessageResponse(false, "User already exists!"));
        } else {
            const newUser = {
                email: req.body.email,
                name: req.body.name,
                password: req.body.password
            };

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
                                res.status(500).json(simpleMessageResponse(false, "Internal Server Error"));
                            });
                    }
                });
            });
        }
    });
});

router.post('/login', (req, res) => {
    let { errors, isValid } = validateUserLogin(req.body);

    if (!isValid) {
        res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email }).then(user => {
        if (!user) {
            res.status(404).json(simpleMessageResponse(false, "User not found!"));
        } else {
            bcrypt.compare(password, user.password).then(matched => {
                if (matched) {
                    const jwtPayload = {
                        id: user.id,
                        name: user.name
                    };

                    jwt.sign(jwtPayload, secretOrKey, { expiresIn: 31556926 }).then(token => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    });
                } else {
                    res.status(400).json(simpleMessageResponse(false, "Password Incorrect!"));
                }
            });
        }
    });
});

module.exports = router;