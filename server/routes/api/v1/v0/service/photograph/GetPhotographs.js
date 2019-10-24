const path = require('path');

const { objectResponse } = require('../../../../../../helper/response-entity/response-body');
const readFile = require('../../../../../../helper/files/readFile');

const imagesLoc = require('../../../../../../config/keys').uploadLoc;

const Contest = require('../../../../../../models/contest/Contest');
const Photograph = require('../../../../../../models/contest/Photograph');

const getPhotographs = (contestName) => {
    return new Promise((resolve, reject) => {
        Contest.findOne({ name: contestName }, { photographs: true })
            .then(contest => {
                Promise.all(contest.photographs.map(photograph_id =>
                    Photograph.findById(photograph_id, { filename: true })
                        .then(photograph => "http://localhost:7000/api/v1.0/users/get-photograph?filename=" + photograph.filename)
                        .catch(err => console.log(err))
                ))
                    .then(images => resolve(objectResponse(true, { photographs: images })))
                    .catch(err => reject(err));
            })
            .catch(err => reject(err));
    });
};

const readPhotograph = (filename) => {
    return new Promise((resolve, reject) => {
        const filePath = path.join(imagesLoc, filename);
        readFile(filePath).then(data => resolve(data)).catch(err => reject(err));
    });
};

module.exports = {
    getPhotographs,
    readPhotograph
};