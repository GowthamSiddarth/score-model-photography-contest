const Contest = require('../../../../../../models/contest/Contest');

const { USER } = require('../../../../../../models/users/types');

const { objectResponse, messageResponse } = require('../../../../../../helper/response-entity/response-body');
const respCodes = require('../../../../../../config/response-codes');

const getContests = (contestName, userType, contestantId) => {
    return new Promise((resolve, reject) => {
        if (!contestName) contestName = '';

        let findQuery = {
            name: {
                $regex: contestName,
                $options: "i"
            }
        };

        if (USER === userType) {
            if (!contestantId) return resolve(messageResponse(false, "", respCodes.FOUR_HUNDRED));
            findQuery['contestants'] = {
                $in: [contestantId]
            };
        }

        Contest.find(findQuery, {
            _id: false,
            __v: false,
            photographs: false,
            contestants: false
        })
            .then(contests => resolve(objectResponse(true, { 'contests': contests })))
            .catch(err => reject(err));
    });
}

module.exports = getContests;