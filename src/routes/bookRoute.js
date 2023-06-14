let express = require("express"),
    router = express.Router(),
    {
        getBooksList,
        getBookDetails,
        addBook,
    } = require("../controller/bookController");

router.get("/books", getBooksList);
router.get("/books/details/:bookId", getBookDetails);
router.post("/books/add", addBook);

module.exports = router;
