let express = require("express"),
    router = express.Router(),
    {
        getBooksList,
        getBookDetails,
        addBook,
        updateBook,
        deleteBook,
    } = require("../controller/bookController");

router.get("/books", getBooksList);
router.get("/books/details/:bookId", getBookDetails);
router.post("/books/add", addBook);
router.put("/books/update/:bookId", updateBook);
router.delete("/books/delete/:bookId", deleteBook);

module.exports = router;
