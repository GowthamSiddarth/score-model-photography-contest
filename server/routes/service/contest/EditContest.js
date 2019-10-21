const validateContest = require('../../../helper/validation/contest');

const responseCode = require('../../../config/response-codes');

const { messageResponse, objectResponse } = require('../../../helper/response-entity/response-body');

const Contest = require('../../../models/contest/Contest');

const editContest = (contestOldName, contestNewName, editedBy) => {
    return new Promise((resolve, reject) => {
        let { errors, isValid } = validateContest(contestOldName, editedBy, contestNewName);

        if (!isValid) {
            return resolve(objectResponse(false, errors, responseCode.FOUR_HUNDRED));
        }

        Contest.findOneAndUpdate({ name: contestOldName }, { 
            name: contestNewName, 
            last_edited_by: editedBy,
            last_edited_on: Date.now()
        }, { 
            new: true,
            useFindAndModify: false
        }, (err, contest) => {
            if (err) return reject(err);
            else if (!contest) return resolve(messageResponse(false, `No contest found with name ${contestOldName}`, responseCode.FOUR_HUNDRED));
            else return resolve(messageResponse(true, `Contest name updated as ${contest.name}`));
        });
    });
}

module.exports = editContest;