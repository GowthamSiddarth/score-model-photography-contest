const { messageResponse } = require('../../../../../../helper/response-entity/response-body');

const Contest = require('../../../../../../models/contest/Contest');
const Photograph = require('../../../../../../models/contest/Photograph');

const submitPhotograph = (imageBuffer, userId, description, contestId) => {
    return new Promise((resolve, reject) => {
        const newPhotograph = new Photograph({
            image: imageBuffer,
            submitted_by: userId,
            description: description,
            contest_id: contestId
        });

        newPhotograph.save()
            .then(photograph => {
                Contest.findByIdAndUpdate(
                    contestId,
                    { $push: { "photographs": photograph._id } },
                    { new: true })
                    .then(contest => resolve(messageResponse(true, "Photo submitted successfully")))
                    .catch(err => reject(err));
            })
            .catch(err => reject(err));
    });
};

module.exports = submitPhotograph;