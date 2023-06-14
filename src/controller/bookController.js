const queries = require("../db/queires"),
    dbConnection = require("../db/connection");
const router = require("../routes/storeRoute");
const { generateStoreCode } = require("../util/helpers");

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

        let bookISBN = generateStoreCode();

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
            bookISBN,
        ]);

        return res.status(201).send("Book added successfully");
    } catch (error) {
        console.log("Error in addBook", error);
        return res.status(500).send("Failed to add book");
    }
};
