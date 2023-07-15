const queries = require("../db/queires"),
    dbConnection = require("../db/connection");
const Logger = require("../services/loggerService");
const logger = new Logger("userController");
// const fastCsv = require("fast-csv");
// const fs = require("fs");
exports.exportBooks = async (req, res) => {
    try {
        const ws = fs.createWriteStream("books.csv");
        let bookListQuery = queries.queryList.GET_BOOKS_LIST_QUERY;
        let result = await dbConnection.dbQuery(bookListQuery);
        logger.info("Return book list", result.rows);
        const data = JSON.parse(JSON.stringify(result.rows));
        fastCsv
            .write(data, { headers: true })
            .on("finish", () => {
                console.log("write to books.csv successfully");
                res.download("books.csv", () => {
                    console.log("File downloaded successfully");
                });
            })
            .pipe(ws);
        // return res.status(200).send({ data: "Data exported successfully" });
    } catch (error) {
        console.log("Error in getBooksList", error);
        return res.status(500).send("Failed to export books");
    }
};
