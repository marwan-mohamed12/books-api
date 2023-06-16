const dbConnection = require("../db/connection");

exports.idValidation = async (id, query) => {
    try {
        let result = await dbConnection.dbQuery(query, [id]);
        if (result.rows.length === 0) {
            return false;
        }
        return true;
    } catch (error) {
        console.log("Error in idValidation", error);
    }
};
