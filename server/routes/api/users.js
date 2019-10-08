const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/User');

const validateUserRegister = require('../../helper/validation/user-register');
const validateUserLogin = require('../../helper/validation/user-login');

const { simpleMessageResponse } = require('../../helper/response-entity/response-body');

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
