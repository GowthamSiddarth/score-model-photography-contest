const multer = require('multer');
const path = require('path');

const { messageResponse } = require('../../../../../../helper/response-entity/response-body');

const Photograph = require('../../../../../../models/contest/Photograph');

const diskStorage = require('../../../../../../config/disk-storage');
const fileUploadLoc = require('../../../../../../config/keys').uploadLoc;

const uploadPhotograph = (req, res, filename) => {
    return new Promise((resolve, reject) => {
        const storage = diskStorage(fileUploadLoc, filename);
        const upload = multer({
            storage: storage,
            fileFilter: (_req, file, cb) => {
                const extension = path.extname(file.originalname).toLowerCase();
                if ('.png' !== extension && '.jpg' !== extension && '.jpeg' !== extension) {
                    return cb(null, false);
                } else {
                    return cb(null, true);
                }
            }
        }).single('image');

        upload(req, res, (err) => {
            if (err) return reject(messageResponse(false, "File Upload Failed"));
            else return resolve(messageResponse(true, "File Uploaded"));
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