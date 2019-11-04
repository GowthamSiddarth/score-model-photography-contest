const Contest = require('../../../../../../models/contest/Contest');
const Photograph = require('../../../../../../models/contest/Photograph');
const User = require('../../../../../../models/users/User');

const { USER } = require('../../../../../../models/users/types');

const { objectResponse, messageResponse } = require('../../../../../../helper/response-entity/response-body');
const respCodes = require('../../../../../../config/response-codes');

const getContestsForUser = (contestName, userType, contestantId) => {
    return new Promise((resolve, reject) => {
        if (!contestName) contestName = '';

        let findQuery = {
            name: {
                $regex: contestName,
                $options: "i"
            }
        };

        if (USER === userType) {
            if (!contestantId) return resolve(messageResponse(false, "Contestant Id is missing", respCodes.FOUR_HUNDRED));
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

const getContestDetails = (contestName, contestantId) => {
    return new Promise((resolve, reject) => {
        Contest.findOne({ name: contestName }, {
            name: true,
            description: true,
            created_on: true,
            ends_on: true,
            contestants: true
        }).then(contest => {
            let contestDetails = contest.toObject();
            contestDetails.can_submit = contest.contestants.includes(contestantId);
            delete contestDetails.contestants;
            return resolve(objectResponse(true, { contest_details: contestDetails }));
        }).catch(err => reject(err));
    });
};

module.exports = {
    getContestsForUser,
    getContestDetails
};