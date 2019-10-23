const multer = require('multer');

module.exports = (destination, filename) => multer.diskStorage({
    destination: destination,
    filename: filename
});