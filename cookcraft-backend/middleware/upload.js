const multer = require("multer");

const storage = multer.memoryStorage(); // Store the image in memory first
const upload = multer({ storage: storage });

module.exports = upload;
