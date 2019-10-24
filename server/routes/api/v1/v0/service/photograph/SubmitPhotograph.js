const multer = require('multer');
const path = require('path');

const { messageResponse, objectResponse } = require('../../../../../../helper/response-entity/response-body');

const Photograph = require('../../../../../../models/contest/Photograph');
const Contest = require('../../../../../../models/contest/Contest');

const diskStorage = require('../../../../../../config/disk-storage');
const fileUploadLoc = require('../../../../../../config/keys').uploadLoc;

const uploadPhotograph = (req, res, filename) => {
    return new Promise((resolve, reject) => {
        let fileExtension = '';
        const storage = diskStorage(fileUploadLoc, filename);
        const upload = multer({
            storage: storage,
            fileFilter: (_req, file, cb) => {
                const extension = path.extname(file.originalname).toLowerCase();
                if ('.png' !== extension && '.jpg' !== extension && '.jpeg' !== extension) {
                    return cb(null, false);
                } else {
                    fileExtension = extension;
                    return cb(null, true);
                }
            }
        }).single('image');

        upload(req, res, (err) => {
            if (err) return reject(messageResponse(false, "File Upload Failed"));
            else return resolve(objectResponse(true, { extension: fileExtension }));
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
            .then(photograph => resolve(objectResponse(true, { photographId: photograph._id })))
            .catch(err => reject(err));
    });
};

const addToContestPhotographs = (contestId, photographId) => {
    return new Promise((resolve, reject) => {
        Contest.findByIdAndUpdate(contestId, {
            $push: { photographs: photographId }
        }, { new: true })
            .then(contest => resolve(messageResponse(true, "Photograph Submitted Successfully")))
            .catch(err => reject(err));
    });
};

module.exports = {
    uploadPhotograph,
    savePhotoMetaData,
    addToContestPhotographs
};