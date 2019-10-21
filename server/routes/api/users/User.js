const express = require('express');
const router = express.Router();

const register = require('../../service/auth/Register');
const login = require('../../service/auth/Login');

const user = require('../../../models/users/types').USER;

router.post('/register', (req, res) => {
    const { name, email, password, confirm_password } = req.body;
    register(name, email, password, confirm_password).then(
        ({ status, ...resObj }) => res.status(status).json(resObj)
    ).catch(err => console.log(err));
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    login(email, password, user).then(
        ({ status, ...resObj }) => res.status(status).json(resObj)
    ).catch(err => console.log(err));
});

module.exports = router;