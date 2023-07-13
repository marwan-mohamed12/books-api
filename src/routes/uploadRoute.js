let express = require("express"),
    router = express.Router(),
    { uploadFile } = require("../controller/uploadController");

router.post("/upload/file", uploadFile);

module.exports = router;
