const express = require('express');
const router = express.Router();

const { verifyToken } = require('../../../../../helper/request-entity/request-headers');

const login = require('../service/auth/Login');
const createContest = require('../service/contest/CreateContest');
const editContest = require('../service/contest/EditContest');
const { getContestsForUser } = require('../service/contest/GetContests');
const deleteContest = require('../service/contest/DeleteContest');

const admin = require('../../../../../models/users/types').ADMIN;

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    login(email, password, admin).then(
        ({ status, ...resObj }) => res.status(status).json(resObj)
    ).catch(err => console.log(err));
});

router.post('/create-contest', verifyToken, (req, res) => {
    const { contestName, createdBy } = req.body;
    createContest(contestName, createdBy).then(
        ({ status, ...resObj }) => res.status(status).json(resObj)
    ).catch(err => console.log(err));
});

router.put('/edit-contest', verifyToken, (req, res) => {
    const { contestOldName, contestNewName, editedBy } = req.body;
    editContest(contestOldName, contestNewName, editedBy).then(
        ({ status, ...resObj }) => res.status(status).json(resObj)
    ).catch(err => console.log(err));
});

router.delete('/delete-contest', verifyToken, (req, res) => {
    const { contestName } = req.body;
    deleteContest(contestName).then(
        ({ status, ...resObj }) => res.status(status).json(resObj)
    ).catch(err => console.log(err));
});

router.post('/get-contests', verifyToken, (req, res) => {
    const { contestName } = req.query;
    getContestsForUser(contestName, admin).then(
        ({ status, ...resObj }) => res.status(status).json(resObj)
    ).catch(err => console.log(err));
});

module.exports = router;