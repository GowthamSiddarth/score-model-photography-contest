const multer = require('multer');
const path = require('path');

const { messageResponse, objectResponse } = require('../../../../../../helper/response-entity/response-body');

const Photograph = require('../../../../../../models/contest/Photograph');

const storage = require('../../../../../config/storage');
const respCodes = require('../../../../../../config/response-codes');
const fileUploadLoc = require('../../../../../config/keys').uploadLoc;

const uploadPhotograph = () => {
    return new Promise((resolve, reject) => {
        const filename = Date.now();
        const upload = multer({
            storage: storage(fileUploadLoc, filename),
            fileFilter: (_req, file, cb) => {
                const extension = path.extname(file.originalname);
                if ('.png' !== extension && '.jpg' !== extension && '.jpeg' !== extension) {
                    return cb(null, false);
                } else {
                    return cb(null, true);
                }
            }
        }).single('image');

        upload(req, res, err => {
            if (err) return reject(messageResponse(false, "File Upload Failed!", respCodes.FIVE_HUNDRED));
            else return resolve(objectResponse(true, { filename: filename }));
        });
    });
};

const savePhotoMetaData = (filename, userId, description, contestId) => {
    return new Promise((resolve, reject) => {
        const newPhotograph = new Photograph({
            filename: filename,
            submitted_by: userId,
            description: description,
            contest_id: contestId
        });

        newPhotograph.save()
            .then(_photograph => resolve(messageResponse(true, "Photo submitted successfully")))
            .catch(err => reject(err));
    });
};

module.exports = {
    uploadPhotograph,
    savePhotoMetaData
};