const Contest = require('../../../../../../models/contest/Contest');

const { objectResponse } = require('../../../../../../helper/response-entity/response-body');

const getContests = () => {
    return new Promise((resolve, reject) => {
        Contest.find({}, {
                _id: false,
                __v: false
            })
            .then(contests => resolve(objectResponse(true, { 'contests': contests })))
            .catch(err => reject(err));
    });
}

module.exports = getContests;