const multer = require('multer');
const path = require('path');

module.exports = (destination, filename) => multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, destination);
    },
    filename: (req, file, cb) => {
        cb(null, filename + path.extname(file.originalname).toLowerCase());
    }
});