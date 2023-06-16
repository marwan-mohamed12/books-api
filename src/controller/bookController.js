const queries = require("../db/queires"),
    dbConnection = require("../db/connection");
const router = require("../routes/storeRoute");
const { idValidation } = require("../util/validation");

exports.getBooksList = async (req, res) => {
    try {
        let bookListQuery = queries.queryList.GET_BOOKS_LIST_QUERY;
        let result = await dbConnection.dbQuery(bookListQuery);

        return res.status(200).send(result.rows);
    } catch (error) {
        console.log("Error in getBooksList", error);
        return res.status(500).send("Failed to get books");
    }
};

exports.getBookDetails = async (req, res) => {
    try {
        let bookId = req.params.bookId;
        let bookDetailsQuery = queries.queryList.GET_BOOK_DETAILS_QUERY;
        let result = await dbConnection.dbQuery(bookDetailsQuery, [bookId]);

        return res.status(200).send(result.rows);
    } catch (error) {
        console.log("Error in getBookDetails", error);
        return res.status(500).send("Failed to get book details");
    }
};

exports.addBook = async (req, res) => {
    try {
        let createdOn = new Date(),
            createdBy = "admin";

        // req.body
        let {
            bookTitle,
            bookDescription,
            bookAuthor,
            bookPublisher,
            bookPages,
            storeCode,
        } = req.body;

        if (
            !bookTitle ||
            !bookAuthor ||
            !bookPublisher ||
            !bookPages ||
            !storeCode
        ) {
            return res.status(400).send({
                error: "Please provide title, author, puplisher, pages number",
            });
        }

        let addBookQuery = queries.queryList.ADD_BOOK_QUERY;
        await dbConnection.dbQuery(addBookQuery, [
            bookTitle,
            bookDescription,
            bookAuthor,
            bookPublisher,
            bookPages,
            storeCode,
            createdOn,
            createdBy,
        ]);

        return res.status(201).send("Book added successfully");
    } catch (error) {
        console.log("Error in addBook", error);
        return res.status(500).send("Failed to add book");
    }
};

exports.updateBook = async (req, res) => {
    try {
        let bookId = req.params.bookId;

        let {
            bookTitle,
            bookDescription,
            bookAuthor,
            bookPublisher,
            bookPages,
            storeCode,
        } = req.body;

        let createdOn = new Date(),
            createdBy = "admin";

        if (
            !bookId ||
            !bookTitle ||
            !bookAuthor ||
            !bookPublisher ||
            !bookPages ||
            !storeCode
        ) {
            return res.status(400).send({
                error: "Please provide bookId, title, author, puplisher, pages number",
            });
        }

        // Validate if the bookId exists
        const bookIdQuery = queries.queryList.SELECT_BOOK_ID_QUERY;
        let bookExists = await idValidation(bookId, bookIdQuery);
        if (!bookExists) {
            return res.status(400).send("Book does not exist");
        }

        let updateBookQuery = queries.queryList.UPDATE_BOOK_QUERY;
        await dbConnection.dbQuery(updateBookQuery, [
            bookTitle,
            bookDescription,
            bookAuthor,
            bookPublisher,
            bookPages,
            storeCode,
            createdOn,
            createdBy,
            bookId,
        ]);

        return res.status(201).send("Book updated successfully");
    } catch (error) {
        console.log("Error in updateBook", error);
        return res.status(500).send("Failed to update book");
    }
};

exports.deleteBook = async (req, res) => {
    try {
        let bookId = req.params.bookId;

        if (!bookId) {
            return res.status(400).send({
                error: "Please provide bookId",
            });
        }

        // Validate if the bookId exists
        const bookIdQuery = queries.queryList.SELECT_BOOK_ID_QUERY;
        let bookExists = await idValidation(bookId, bookIdQuery);
        if (!bookExists) {
            return res.status(400).send("Book does not exist");
        }

        let deleteBookQuery = queries.queryList.DELETE_BOOK_QUERY;
        await dbConnection.dbQuery(deleteBookQuery, [bookId]);

        return res.status(201).send("Book deleted successfully");
    } catch (error) {
        console.log("Error in deleteBook", error);
        return res.status(500).send("Failed to delete book");
    }
};
