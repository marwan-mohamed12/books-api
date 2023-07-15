let express = require("express"),
    router = express.Router(),
    { exportBooks } = require("../controller/exportController");

router.get("/export/books", exportBooks);

module.exports = router;
