const jwt = require('jsonwebtoken');
const { simpleMessageResponse } = require('../response-entity/response-body');

const secretOrKey = require('../../config/keys').secretOrKey;

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json(simpleMessageResponse(false, "Unauthorized User!"));
    }

    jwt.verify(token, secretOrKey, (err, decoded) => {
        if (err) {
            res.status(500).json(simpleMessageResponse(false, "Failed to authenticate token"));
        }

        const authUser = decoded.isAdmin ? require('../../models/users/Admin') : require('../../models/users/User');
        authUser.findById(decoded.id, { password: false }, (err, _authUser) => {
            if (err) {
                res.status(500).json(simpleMessageResponse(false, "There was a problem finding User. Please contact administrator"));
            }

            if (!_authUser) {
                res.status(404).json(simpleMessageResponse(false, "User not found!"));
            }

            next();
        });
    });
}

module.exports = {
    verifyToken
};