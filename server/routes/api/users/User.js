const express = require('express');
const router = express.Router();

const register = require('../../service/auth/Register');
const login = require('../../service/auth/Login');

const user = require('../../../models/users/types').USER;

router.post('/register', (req, res) => {
    register(req.body.name, req.body.email, req.body.password, req.body.confirm_password).then(
        ({ status, ...resObj }) => res.status(status).json(resObj)
    ).catch(err => console.log(err));
});

router.post('/login', (req, res) => {
    login(req.body.email, req.body.password, user).then(
        ({ status, ...resObj }) => res.status(status).json(resObj)
    ).catch(err => console.log(err));
});

module.exports = router;