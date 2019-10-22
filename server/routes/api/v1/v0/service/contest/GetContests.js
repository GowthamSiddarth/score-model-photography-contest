const Contest = require('../../../../../../models/contest/Contest');

const { objectResponse } = require('../../../../../../helper/response-entity/response-body');

const getContests = (contestName) => {
    return new Promise((resolve, reject) => {
        if (!contestName) contestName = '';
        
        Contest.find({
            name: {
                $regex: contestName,
                $options: "i"
            }
        }, {
            _id: false,
            __v: false
        })
            .then(contests => resolve(objectResponse(true, { 'contests': contests })))
            .catch(err => reject(err));
    });
}

module.exports = getContests;