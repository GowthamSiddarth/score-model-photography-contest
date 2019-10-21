const isEmptyString = require('../../../helper/validation/is-empty-string');

const { messageResponse, objectResponse } = require('../../../helper/response-entity/response-body');

const responseCode = require('../../../config/response-codes');

const Contest = require('../../../models/contest/Contest');

const deleteContest = (contestName) => {
    return new Promise((resolve, reject) => {
        const { errors, isValid } = isEmptyString(contestName, "contest_name");

        if (!isValid) {
            return resolve(objectResponse(false, errors, responseCode.FOUR_HUNDRED));
        }

        Contest.findOneAndDelete({ name: contestName })
            .then(contest => {
                if (!contest) return resolve(messageResponse(false, `No contest found with name ${contestName}`, responseCode.FOUR_O_FOUR));
                else resolve(messageResponse(true, `${contest.name} is deleted`));
            })
            .catch(err => reject(err));
    });
}

module.exports = deleteContest;