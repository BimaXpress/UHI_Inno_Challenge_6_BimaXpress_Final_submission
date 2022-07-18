const multer = require('multer');

const storage = multer.memoryStorage();
const multerUpload = multer({ storage });

module.exports = { multerUpload };
