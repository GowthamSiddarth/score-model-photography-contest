const validateContest = require('../../../../../../helper/validation/contest');

const Contest = require('../../../../../../models/contest/Contest');

const { messageResponse, objectResponse } = require('../../../../../../helper/response-entity/response-body');

const responseCode = require('../../../../../../config/response-codes');

const createContest = (contestName, createdBy) => {
    return new Promise((resolve, reject) => {
        const { errors, isValid } = validateContest(contestName, createdBy);

        if (!isValid) {
            return resolve(objectResponse(false, errors, responseCode.FOUR_HUNDRED));
        }

        Contest.findOne({ name: contestName }).then(contest => {
            if (contest) {
                errors.contest_name = `Contest with name '${contestName}' already exists`;
                return resolve(objectResponse(false, errors, responseCode.FOUR_HUNDRED));
            } else {
                new Contest({
                    name: contestName,
                    created_by: createdBy
                }).save().then(_contest => resolve(messageResponse(true, "Contest Created")))
                    .catch(err => reject(err));
            }
        });
    });
}

module.exports = createContest;