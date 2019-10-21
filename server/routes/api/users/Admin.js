const express = require('express');
const router = express.Router();

const { verifyToken } = require('../../../helper/request-entity/request-headers');

const login = require('../../service/auth/Login');
const createContest = require('../../service/contest/CreateContest');

const admin = require('../../../models/users/types').ADMIN;

router.post('/login', (req, res) => {
    login(req.body.email, req.body.password, admin).then(
        ({ status, ...resObj }) => res.status(status).json(resObj)
    ).catch(err => console.log(err));
});

router.post('/create-contest', verifyToken, (req, res) => {
    createContest(req.body.contestName, req.body.createdBy).then(
        ({ status, ...resObj }) => res.status(status).json(resObj)
    ).catch(err => console.log(err));
});

module.exports = router;