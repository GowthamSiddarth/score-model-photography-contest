const { messageResponse } = require('../../../../../../helper/response-entity/response-body');

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
            .then(photograph => resolve(messageResponse(true, "Photo submitted successfully")))
            .catch(err => reject(err));
    });
};

module.exports = submitPhotograph;