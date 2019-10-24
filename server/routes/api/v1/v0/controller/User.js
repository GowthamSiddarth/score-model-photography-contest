const path = require('path');
const express = require('express');
const router = express.Router();

const register = require('../service/auth/Register');
const login = require('../service/auth/Login');

const { verifyToken } = require('../../../../../helper/request-entity/request-headers');
const respCodes = require('../../../../../config/response-codes');

const user = require('../../../../../models/users/types').USER;

const { uploadPhotograph, savePhotoMetaData, addToContestPhotographs } = require('../service/photograph/SubmitPhotograph');
const { getPhotographs, readPhotograph } = require('../service/photograph/GetPhotographs');

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

router.post('/submit-photograph', verifyToken, (req, res) => {
    let filename = Date.now().toString();
    uploadPhotograph(req, res, filename).then(
        ({ status, ...resObj }) => {
            if (!status) return res.status(status).json(resObj);
            else {
                const { userId, description, contestId } = req.body;
                filename = filename + (undefined !== resObj.extension ? resObj.extension : '');
                savePhotoMetaData(filename, userId, description, contestId).then(
                    ({ status, ...resObj }) => {
                        const { photographId } = resObj;
                        addToContestPhotographs(contestId, photographId).then(
                            ({ status, ...resObj }) => res.status(status).json(resObj))
                            .catch(err => console.log(err));
                    }
                ).catch(err => console.log(err));
            }
        })
});

router.get('/get-photographs', verifyToken, (req, res) => {
    const { contestName } = req.query;
    getPhotographs(contestName).then(
        ({ status, ...resObj }) => res.status(status).json(resObj)
    ).catch(err => console.log(err));
});

router.get('/get-photograph', verifyToken, (req, res) => {
    const { filename } = req.query;
    readPhotograph(filename).then(data => {
        const extension = path.extname(filename);
        const imageType = extension.substr(extension.indexOf('.') + 1);

        res.writeHead(respCodes.TWO_HUNDRED, 'Content-Type', 'image/' + imageType);
        res.end(data);
    }).catch(err => console.log(err));
});

module.exports = router;