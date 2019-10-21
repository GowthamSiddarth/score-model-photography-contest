const express = require('express');
const router = express.Router();

const { verifyToken } = require('../../../helper/request-entity/request-headers');

const login = require('../../service/auth/Login');
const createContest = require('../../service/contest/CreateContest');

const admin = require('../../../models/users/types').ADMIN;

router.post('/login', (req, res) => login(req, res, admin));

router.post('/create-contest', verifyToken, (req, res) => createContest(req, res));

module.exports = router;