let express = require("express"),
    router = express.Router(),
    { getBooksList, addBook } = require("../controller/bookController");

router.get("/books", getBooksList);
router.post("/books/add", addBook);

module.exports = router;
