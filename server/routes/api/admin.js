const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

const { simpleMessageResponse } = require('../../helper/response-entity/response-body');
const { verifyToken } = require('../../helper/request-entity/request-headers');

const validateUserLogin = require('../../helper/validation/user-login');
const validateContest = require('../../helper/validation/create-contest');
const secretOrKey = require('../../config/keys').secretOrKey;

const Admin = require('../../models/users/Admin');
const Contest = require('../../models/contest/Contest');

router.post('/login', (req, res) => {
    const { errors, isValid } = validateUserLogin(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const { email, password } = req.body;

    Admin.findOne({ email: email }).then(admin => {
        if (!admin) {
            errors.email = 'Admin not found!';
            return res.status(404).json(errors);
        }

        bcrypt.compare(password, admin.password).then(matched => {
            if (matched) {
                const jwtPayload = {
                    id: admin.id,
                    name: admin.name,
                    isAdmin: true
                };

                jwt.sign(jwtPayload, secretOrKey, { expiresIn: 31556926 }, (_err, token) => {
                    res.json({
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
});

router.post('/create-contest', verifyToken, (req, res) => {
    const { errors, isValid } = validateContest(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const { contestName, createdBy } = req.body;

    Contest.findOne({ name: contestName }).then(contest => {
        if (contest) {
            errors.contest_name = `Contest with name '${contestName}' already exists`;
            return res.status(400).json(errors);
        }

        const newContest = new Contest({
            name: contestName,
            created_by: createdBy
        });

        newContest.save()
            .then(_contest => res.json(simpleMessageResponse(true, "Contest Created")))
            .catch(err => {
                console.log(err);
                return res.status(500).json(simpleMessageResponse(false, "Contest Creation Failed!"));
            });
    });
});

module.exports = router;