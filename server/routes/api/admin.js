const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

const validateUserLogin = require('../../helper/validation/user-login');
const secretOrKey = require('../../config/keys').secretOrKey;

const Admin = require('../../models/users/Admin');

router.post('/login', (req, res) => {
    const { errors, isValid } = validateUserLogin(req.body);

    if (!isValid) {
        res.status(400).json(errors);
    }

    const { email, password } = req.body;

    Admin.findOne({ email: email }).then(admin => {
        if (!admin) {
            errors.email = 'Admin not found!';
            res.status(404).json(errors);
        }

        bcrypt.compare(password, admin.password).then(matched => {
            if (matched) {
                const jwtPayload = {
                    id: admin.id,
                    name: admin.name,
                    isAdmin: true
                };

                jwt.sign(jwtPayload, secretOrKey, { expiresIn: 31556926 }, (err, token) => {
                    res.json({
                        success: true,
                        token: "Bearer " + token
                    });
                });
            } else {
                errors.password = "Password Incorrect!";
                res.status(400).json(errors);
            }
        });
    });
});

module.exports = router;