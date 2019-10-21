const express = require('express');
const router = express.Router();

const register = require('../../service/auth/Register');
const login = require('../../service/auth/Login');

const user = require('../../../models/users/types').USER;

router.post('/register', (req, res) => register(req, res));

router.post('/login', (req, res) => login(req, res, user));

module.exports = router;